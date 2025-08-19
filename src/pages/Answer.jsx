// src/pages/Answer.jsx
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

// API
import { getQuestion } from '../api/getQuestion';
import { getSubjectsId } from '../api/getSubjectsId';
import { deleteSubjectsId } from '../api/deleteSubjectsId';
import { createAnswer, deleteAnswer, patchAnswer } from '../api/answers';

// 팀 공용 헤더(배경 + 프로필)
import Headers from '../components/question/Headers';

// SVG
import AnswerComplete from '../assets/images/answer_complete.svg?react';
import AnswerNo from '../assets/images/answer_no.svg?react';
import CloseIcon from '../assets/images/Close.svg?react';
import EditIcon from '../assets/images/Edit.svg?react';
import MessagesIcon from '../assets/images/messages.svg?react';
import MoreIcon from '../assets/images/More.svg?react';
import ProfileImg from '../assets/images/profile_img.svg?react';
import ThumbsDownIcon from '../assets/images/thumbs-down.svg?react';
import ThumbsUpIcon from '../assets/images/thumbs-up.svg?react';

const apiError = e =>
  e?.response?.data?.detail ||
  e?.response?.data?.message ||
  (typeof e?.response?.data === 'string' ? e.response.data : '') ||
  e?.message ||
  '알 수 없는 오류가 발생했습니다.';

export default function Answer() {
  const navigate = useNavigate();
  const subjectId =
    typeof window !== 'undefined' ? localStorage.getItem('id') : null;

  const [userInfo, setUserInfo] = useState(null);
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadErr, setLoadErr] = useState('');

  // 훅은 항상 호출되도록 유지, 내부 가드로 빠른 종료
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
        const list = Array.isArray(data) ? data : (data?.results ?? []);

        const normalized = list.map(q => {
          const firstAnswer =
            q.answer ??
            (Array.isArray(q.answers) && q.answers.length > 0
              ? q.answers[0]
              : null);

          return {
            questionId: q.id,
            question: q.content ?? '(내용 없음)',
            createdAt: q.createdAt ? timeAgo(q.createdAt) : '방금 전',
            author: q.authorName ?? q.author?.name ?? '익명', // 질문 작성자(표시는 안 쓰지만 데이터는 유지)
            answer: firstAnswer,
          };
        });

        setCards(normalized);
      } catch (e) {
        if (!cancelled) {
          setLoadErr(apiError(e) || '질문 목록을 불러오지 못했습니다.');
        }
      } finally {
        if (!cancelled) {
          setLoading(false); // finally 안 return 금지 → 가드로 처리
        }
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [subjectId]);

  const handleDeleteProfile = async () => {
    if (!subjectId) return;
    const ok = window.confirm('프로필을 삭제하시겠습니까?');
    if (!ok) return;

    try {
      await deleteSubjectsId(subjectId);
      localStorage.removeItem('id');
      alert('프로필이 삭제되었습니다.');
      navigate('/list');
    } catch (e) {
      alert(apiError(e));
    }
  };

  return (
    <div className="min-h-screen bg-gs-20 flex flex-direction flex-col items-center">
      {/* 훅을 조건부 호출하지 않기 위해 렌더링만 조건 처리 */}
      {!subjectId ? (
        <div className="min-h-screen flex items-center justify-center bg-gs-20 w-full">
          <div className="bg-white rounded-xl p-8 shadow text-center">
            <p className="text-bn-50 mb-4">프로필을 생성해주세요.</p>
            <button
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

          {/* 프로필 삭제 버튼 */}
          <div className="w-full flex justify-center">
            <div className="w-[716px] flex justify-end mt-[172px]">
              <button
                onClick={handleDeleteProfile}
                className="px-5 h-[35px] rounded-full bg-bn-40 text-gs-10 text-sm font-medium hover:opacity-90"
              >
                삭제하기
              </button>
            </div>
          </div>

          {/* 질문 컨테이너 */}
          <main className="border-bn-30 rounded-[16px] w-[716px] mt-[8px] mb-[136px] bg-bn-10 border border-solid flex flex-col justify-center items-center">
            <section className="max-w-[684px] rounded-[16px] p-[16px] w-full">
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
                    // ✅ 답변자 영역을 메인 프로필로 일치
                    author={userInfo?.name ?? '내 프로필'}
                    authorImage={userInfo?.imageSource ?? null}
                    question={c.question}
                    createdAt={c.createdAt}
                    initialAnswer={c.answer}
                  />
                ))}

              {!loading && cards.length === 0 && !loadErr && (
                <div className="w-full text-center text-gs-50 my-6">
                  등록된 질문이 없습니다.
                </div>
              )}
            </section>
          </main>
        </>
      )}
    </div>
  );
}

function AnswerCard({
  questionId,
  author,
  authorImage, // ✅ 추가: 메인 프로필 이미지
  question,
  createdAt,
  initialAnswer,
}) {
  const [answer, setAnswer] = useState(initialAnswer ?? null);
  useEffect(() => setAnswer(initialAnswer ?? null), [initialAnswer]);

  const [text, setText] = useState('');
  const [editText, setEditText] = useState('');

  const [menuOpen, setMenuOpen] = useState(false);
  const [mode, setMode] = useState('idle'); // 'idle' | 'editing' | 'confirm-delete'
  const [vote, setVote] = useState(null);
  const menuRef = useRef(null);

  const [saving, setSaving] = useState(false);
  const [editing, setEditing] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState('');

  const isAnswered = !!answer;

  // 바깥 클릭 닫기
  useEffect(() => {
    const onClickOutside = e => {
      if (!menuRef.current) return;
      if (!menuRef.current.contains(e.target)) setMenuOpen(false);
    };
    if (menuOpen) document.addEventListener('mousedown', onClickOutside);
    return () => document.removeEventListener('mousedown', onClickOutside);
  }, [menuOpen, menuRef]);

  const toggleMenu = () => setMenuOpen(v => !v);
  const toggleVote = c => setVote(prev => (prev === c ? null : c));

  const handleCreate = async () => {
    if (!text.trim() || !questionId) return;
    try {
      setSaving(true);
      setError('');
      const created = await createAnswer(questionId, {
        content: text.trim(),
        isRejected: false,
      });
      setAnswer(created);
      setText('');
    } catch (e) {
      setError(apiError(e) || '답변 생성 중 오류가 발생했습니다.');
    } finally {
      setSaving(false);
    }
  };

  const openEdit = () => {
    if (!isAnswered) {
      setError('답변을 작성해주세요.');
      return;
    }
    setEditText(answer.content);
    setMode('editing');
    setMenuOpen(false);
  };

  const handlePatch = async () => {
    if (!editText.trim() || !answer?.id) return;
    try {
      setEditing(true);
      setError('');
      const updated = await patchAnswer(answer.id, {
        content: editText.trim(),
      });
      setAnswer(updated);
      setMode('idle');
    } catch (e) {
      setError(apiError(e) || '수정 중 오류가 발생했습니다.');
    } finally {
      setEditing(false);
    }
  };

  const handleDelete = async () => {
    if (!answer?.id) {
      setError('삭제할 답변이 없습니다.');
      return;
    }
    try {
      setDeleting(true);
      setError('');
      await deleteAnswer(answer.id);
      setAnswer(null);
      setMode('idle');
    } catch (e) {
      setError(apiError(e) || '삭제 중 오류가 발생했습니다.');
    } finally {
      setDeleting(false);
    }
  };

  return (
    <article className="bg-gs-10 w-[652px] rounded-[16px] p-[32px] mt-[20px] flex flex-col items-start gap-[24px]">
      {/* 헤더: 상태 배지 + 더보기 */}
      <div className="w-full flex items-center">
        <span
          className={`px-[12px] py-[4px] text-[14px] font-medium border border-solid rounded-[8px] 
            ${isAnswered ? 'text-bn-40 border-bn-40' : 'text-gs-40 border-gs-40'}`}
        >
          {isAnswered ? '답변 완료' : '미답변'}
        </span>

        <div className="ml-auto relative" ref={menuRef}>
          <button
            type="button"
            aria-haspopup="menu"
            aria-expanded={menuOpen}
            onClick={toggleMenu}
            onKeyDown={e =>
              (e.key === 'Enter' || e.key === ' ') && toggleMenu()
            }
            className="h-6 w-6 flex items-center justify-center rounded-full hover:bg-gs-20 cursor-pointer focus:outline-none focus:ring-2 focus:ring-bn-30"
          >
            <MoreIcon className="h-4 w-4" aria-hidden />
          </button>

          {menuOpen && (
            <div
              role="menu"
              aria-label="카드 메뉴"
              className="absolute right-0 top-8 w-[140px] rounded-md bg-white shadow-md ring-1 ring-gs-30 p-1 z-20 flex flex-col"
            >
              <button
                type="button"
                role="menuitem"
                onClick={openEdit}
                className="group flex items-center gap-2 h-[34px] w-full rounded-[6px] px-2 text-[13px] text-gs-50 hover:bg-gs-20 hover:text-bn-50"
              >
                <EditIcon className="w-4 h-4" aria-hidden />
                수정하기
              </button>

              <button
                type="button"
                role="menuitem"
                onClick={() => {
                  if (!isAnswered) {
                    setError('삭제할 답변이 없습니다.');
                    setMenuOpen(false);
                    return;
                  }
                  setMode('confirm-delete');
                  setMenuOpen(false);
                }}
                className="group flex items-center gap-2 h-[34px] w-full rounded-[6px] px-2 text-[13px] text-gs-50 hover:bg-gs-20 hover:text-bn-50"
              >
                <CloseIcon className="w-4 h-4" aria-hidden />
                답변 삭제
              </button>
            </div>
          )}
        </div>
      </div>

      {/* 질문 */}
      <div className="flex flex-col gap-[4px]">
        <p className="text-[14px] font-medium text-gs-40">질문 · {createdAt}</p>
        <p className="text-[18px] font-normal">{question}</p>
      </div>

      {/* 본문 */}
      <div className="w-full">
        <div className="flex gap-[12px]">
          {authorImage ? (
            <img
              src={authorImage}
              alt={`${author} 프로필`}
              className="w-[48px] h-[48px] rounded-full object-cover"
            />
          ) : (
            <ProfileImg className="w-[48px] h-[48px]" />
          )}
          <div className="flex-1 flex flex-col gap-[8px]">
            <p className="text-[18px] font-normal">{author}</p>

            {!isAnswered && mode !== 'editing' && (
              <textarea
                value={text}
                onChange={e => setText(e.target.value)}
                placeholder="답변을 입력해주세요"
                className="min-h-[120px] w-full resize-none rounded-lg bg-gs-20 border border-gs-30 px-3 py-2 text-[14px] text-gs-50 outline-none"
              />
            )}

            {isAnswered && mode !== 'editing' && (
              <div className="text-[16px] whitespace-pre-wrap">
                {answer.content}
              </div>
            )}

            {mode === 'editing' && (
              <textarea
                value={editText}
                onChange={e => setEditText(e.target.value)}
                placeholder="답변을 수정해주세요"
                className="min-h-[120px] w-full resize-none rounded-lg bg-gs-20 border border-gs-30 px-3 py-2 text-[14px] text-gs-50 outline-none"
              />
            )}

            {/* 버튼 */}
            <div className="mt-[16px] w-full">
              {!isAnswered &&
                mode !== 'editing' &&
                mode !== 'confirm-delete' && (
                  <button
                    type="button"
                    onClick={handleCreate}
                    disabled={!text.trim() || saving}
                    className={`w-full h-11 rounded-lg flex items-center justify-center text-[14px] font-semibold ${
                      text.trim() && !saving
                        ? 'bg-bn-40 text-gs-10'
                        : 'bg-bn-30 text-gs-10/80 cursor-not-allowed'
                    }`}
                  >
                    {saving ? '저장 중…' : '답변 완료'}
                  </button>
                )}

              {mode === 'editing' && (
                <button
                  type="button"
                  onClick={handlePatch}
                  disabled={!editText.trim() || editing}
                  className={`w-full h-11 rounded-lg flex items-center justify-center text-[14px] font-semibold ${
                    editText.trim() && !editing
                      ? 'bg-bn-40 text-gs-10'
                      : 'bg-bn-30 text-gs-10/80 cursor-not-allowed'
                  }`}
                >
                  {editing ? '수정 중…' : '수정 완료'}
                </button>
              )}

              {mode === 'confirm-delete' && (
                <div className="w-full flex flex-col gap-2">
                  <button
                    type="button"
                    onClick={handleDelete}
                    disabled={deleting}
                    className="w-full h-11 rounded-lg bg-red-500 text-white text-[14px] font-semibold hover:opacity-90"
                  >
                    {deleting ? '삭제 중…' : '답변을 삭제하시겠습니까?'}
                  </button>
                  <button
                    type="button"
                    onClick={() => setMode('idle')}
                    className="w-full h-11 rounded-lg border border-gs-30 text-[14px]"
                  >
                    취소
                  </button>
                </div>
              )}

              {error && (
                <div className="mt-3 text-[13px] text-red-600">{error}</div>
              )}
            </div>
          </div>
        </div>

        {/* 좋아요/싫어요 */}
        <div className="border-t-gs-30 border-t-[1px] w-full pt-[24px] flex gap-[32px] text-[14px] font-medium text-gs-40 mt-[16px]">
          <button
            className={`flex items-center gap-[6px] ${
              vote === 'like' ? 'text-bn-40' : ''
            }`}
            onClick={() => toggleVote('like')}
          >
            <ThumbsUpIcon className="w-[16px] h-[16px]" />
            <p>좋아요</p>
          </button>
          <button
            className={`flex items-center gap-[6px] ${
              vote === 'dislike' ? 'text-bn-40' : ''
            }`}
            onClick={() => toggleVote('dislike')}
          >
            <ThumbsDownIcon className="w-[16px] h-[16px]" />
            <p>싫어요</p>
          </button>
        </div>
      </div>
    </article>
  );
}

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
