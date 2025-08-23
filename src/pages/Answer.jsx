import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getQuestion } from '../api/getQuestion';
import { getSubjectsId } from '../api/getSubjectsId';
import { deleteSubjectsId } from '../api/deleteSubjectsId';
import { createAnswer, deleteAnswer, patchAnswer } from '../api/answers';
import Headers from '../components/question/Headers';
import AnswerCard from '../components/Answer/AnswerCard';
import MessagesIcon from '../assets/images/messages.svg?react';

const apiError = e =>
  e?.response?.data?.detail ||
  e?.response?.data?.message ||
  (typeof e?.response?.data === 'string' ? e.response.data : '') ||
  e?.message ||
  '알 수 없는 오류가 발생했습니다.';

function timeAgo(iso) {
  const then = new Date(iso).getTime();
  const now = Date.now();
  const diff = Math.max(0, now - then);
  const m = Math.floor(diff / 60000);
  if (m < 1) return '방금 전';
  if (m < 60) return `${m}분 전`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}시간 전`;
  const d = Math.floor(h / 24);
  return `${d}일 전`;
}

export default function AnswerPage() {
  const navigate = useNavigate();
  const subjectId =
    typeof window !== 'undefined' ? localStorage.getItem('id') : null;

  const [userInfo, setUserInfo] = useState(null);
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadErr, setLoadErr] = useState('');

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deletingProfile, setDeletingProfile] = useState(false);
  const [deleteErr, setDeleteErr] = useState('');

  useEffect(() => {
    if (!subjectId) {
      setLoading(false);
      return;
    }
    let cancelled = false;
    (async () => {
      try {
        setLoading(true);
        setLoadErr('');
        const profile = await getSubjectsId(subjectId);
        if (cancelled) return;
        setUserInfo({
          name: profile?.name ?? '내 프로필',
          imageSource: profile?.imageSource ?? profile?.imageUrl ?? null,
          questionCount: profile?.questionCount ?? 0,
        });

        const data = await getQuestion(subjectId);
        if (cancelled) return;
        const rawList = Array.isArray(data) ? data : (data?.results ?? []);
        const normalized = rawList.map(q => {
          const firstAnswer =
            q.answer ??
            (Array.isArray(q.answers) && q.answers.length > 0
              ? q.answers[0]
              : null);
          return {
            questionId: q.id,
            question: q.content ?? '(내용 없음)',
            createdAt: q.createdAt ? timeAgo(q.createdAt) : '방금 전',
            answer: firstAnswer,
            like: typeof q.like === 'number' ? q.like : 0,
            dislike: typeof q.dislike === 'number' ? q.dislike : 0,
          };
        });
        setCards(normalized);
      } catch (e) {
        if (!cancelled)
          setLoadErr(apiError(e) || '질문 목록을 불러오지 못했습니다.');
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [subjectId]);

  useEffect(() => {
    if (showDeleteModal) {
      const onKey = e => {
        if (e.key === 'Escape') setShowDeleteModal(false);
      };
      document.addEventListener('keydown', onKey);
      const prev = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.removeEventListener('keydown', onKey);
        document.body.style.overflow = prev;
      };
    }
  }, [showDeleteModal]);

  const handleConfirmDeleteProfile = async () => {
    if (!subjectId || deletingProfile) return;
    try {
      setDeletingProfile(true);
      setDeleteErr('');
      await deleteSubjectsId(subjectId);
      localStorage.removeItem('id');
      setShowDeleteModal(false);
      navigate('/list', { replace: true });
    } catch (e) {
      setDeleteErr(apiError(e));
    } finally {
      setDeletingProfile(false);
    }
  };

  const handleDeleteProfile = () => setShowDeleteModal(true);

  const onCreateAnswer = async (questionId, content) => {
    try {
      const created = await createAnswer(questionId, {
        content,
        isRejected: false,
      });
      setCards(prev =>
        prev.map(c =>
          c.questionId === questionId ? { ...c, answer: created } : c
        )
      );
      return created;
    } catch (e) {
      throw new Error(apiError(e));
    }
  };

  const onEditAnswer = async (answerId, content) => {
    try {
      const updated = await patchAnswer(answerId, { content });
      setCards(prev =>
        prev.map(c =>
          c.answer?.id === answerId ? { ...c, answer: updated } : c
        )
      );
      return updated;
    } catch (e) {
      throw new Error(apiError(e));
    }
  };

  const onDeleteAnswer = async answerId => {
    try {
      await deleteAnswer(answerId);
      setCards(prev =>
        prev.map(c => (c.answer?.id === answerId ? { ...c, answer: null } : c))
      );
    } catch (e) {
      throw new Error(apiError(e));
    }
  };

  return (
    <div className="min-h-screen bg-gs-20 flex flex-col items-center overflow-x-hidden">
      {!subjectId ? (
        <div className="min-h-screen flex items-center justify-center bg-gs-20 w-full px-6">
          <div className="bg-white rounded-xl p-8 shadow text-center w-full max-w-[716px]">
            <p className="text-bn-50 mb-4">프로필을 생성해주세요.</p>
            <button
              type="button"
              onClick={() => navigate('/')}
              className="px-4 py-2 rounded-lg bg-bn-40 text-white"
            >
              프로필 만들러 가기
            </button>
          </div>
        </div>
      ) : (
        <>
          <Headers
            userInfo={
              userInfo ?? {
                name: '내 프로필',
                imageSource: null,
                questionCount: 0,
              }
            }
          />

          <div className="w-full flex justify-center px-6 md:px-0">
            <div className="w-full max-w-[716px] flex justify-end mt-[172px]">
              <button
                type="button"
                onClick={handleDeleteProfile}
                className="px-5 h-[35px] rounded-full bg-bn-40 text-gs-10 text-sm font-medium hover:opacity-90"
              >
                삭제하기
              </button>
            </div>
          </div>

          {/* 바깥 래퍼로 24px 여백 */}
          <div className="w-full px-6 md:px-0">
            <main className="border-bn-30 rounded-[16px] w-full max-w-[716px] mx-auto mt-[8px] mb-[136px] bg-bn-10 border border-solid flex flex-col justify-center items-center">
              <section className="w-full max-w-[684px] rounded-[16px] p-4 md:p-[16px] min-w-0">
                <div className="flex items-center justify-center gap-[8px] mb-[16px]">
                  <MessagesIcon className="fill-bn-40 w-[20px] h-[20px]" />
                  {loading ? (
                    <h2 className="text-[20px] font-[400] text-bn-40">
                      불러오는 중…
                    </h2>
                  ) : (
                    <h2 className="text-[20px] font-[400] text-bn-40">
                      {cards.length === 0
                        ? '아직 질문이 없습니다.'
                        : `${cards.length}개의 질문이 있습니다.`}
                    </h2>
                  )}
                </div>

                {loadErr && (
                  <div className="w-full text-center text-red-600 text-sm mb-3">
                    {loadErr}
                  </div>
                )}

                {!loading &&
                  cards.map(c => (
                    <AnswerCard
                      key={c.questionId}
                      questionId={c.questionId}
                      author={userInfo?.name ?? '내 프로필'}
                      authorImage={userInfo?.imageSource ?? null}
                      question={c.question}
                      createdAt={c.createdAt}
                      answer={c.answer}
                      like={c.like}
                      dislike={c.dislike}
                      onCreate={onCreateAnswer}
                      onEdit={onEditAnswer}
                      onDelete={onDeleteAnswer}
                    />
                  ))}

                {!loading && cards.length === 0 && !loadErr && (
                  <div className="w-full text-center text-gs-50 my-6">
                    등록된 질문이 없습니다.
                  </div>
                )}
              </section>
            </main>
          </div>

          {showDeleteModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center">
              <div
                className="absolute inset-0 bg-gs-60/10"
                onClick={() => !deletingProfile && setShowDeleteModal(false)}
              />
              <div
                role="dialog"
                aria-modal="true"
                aria-labelledby="deleteProfileTitle"
                className="relative mx-6 w-full max-w-[420px] rounded-2xl bg-white shadow-lg ring-1 ring-gs-30 p-6"
              >
                <h3
                  id="deleteProfileTitle"
                  className="text-[18px] font-semibold text-bn-50"
                >
                  프로필을 삭제할까요?
                </h3>
                <p className="mt-2 text-[14px] text-gs-50">
                  모든 질문과 답변이 삭제됩니다.
                </p>

                {deleteErr && (
                  <p className="mt-3 text-[13px] text-red-600">{deleteErr}</p>
                )}

                <div className="mt-6 grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setShowDeleteModal(false)}
                    disabled={deletingProfile}
                    className="h-11 rounded-lg border border-gs-30 text-[14px] hover:bg-gs-20"
                  >
                    취소
                  </button>
                  <button
                    type="button"
                    onClick={handleConfirmDeleteProfile}
                    disabled={deletingProfile}
                    className="h-11 rounded-lg bg-red-500 text-white text-[14px] font-semibold hover:opacity-90"
                  >
                    {deletingProfile ? '삭제 중…' : '삭제하기'}
                  </button>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
