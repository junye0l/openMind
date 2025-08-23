import React, {
  useEffect,
  useMemo,
  useRef,
  useState,
  useCallback,
} from 'react';
import { useParams } from 'react-router-dom';
import instance from '../../api/ApiAxios.js';
import profileImg from '../../assets/images/profile_img.svg';

export default function QuestionModal({
  subjectId = null, // 외부에서 명시적으로 넘겨주는 subjectId(최우선)
  onSent, // 성공 후 부모가 토스트/갱신 처리
  subjectName, // 외부에서 넘겨주는 대상 이름(선택)
  subjectAvatarUrl, // 외부에서 넘겨주는 대상 아바타 URL(선택)
}) {
  const { id: routeId } = useParams(); // /subjects/:id 라우트일 때 URL의 id
  const textareaRef = useRef(null);

  // UI 상태
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [question, setQuestion] = useState('');
  const [loading, setLoading] = useState(false);

  // 대상 정보(서버) & 로딩
  const [subjectInfo, setSubjectInfo] = useState(null); // { name, imageSource, ... } (키명은 API에 따름)
  const [subjectLoading, setSubjectLoading] = useState(false);

  // 전역 이벤트로 넘어온 subjectId
  const [eventSubjectId, setEventSubjectId] = useState(null);

  // 파생값: 실제 사용할 subjectId (우선순위: props > 전역이벤트 > 라우트)
  const effectiveSubjectId = useMemo(() => {
    const raw = subjectId ?? eventSubjectId ?? routeId ?? null;
    return raw ? Number(raw) : null;
  }, [subjectId, eventSubjectId, routeId]);

  // 파생값: 버튼 활성 여부
  const canSend = useMemo(
    () => question.trim().length > 0 && !loading,
    [question, loading]
  );

  // 파생값: To. 라인 표시값 (우선순위: props > 서버데이터 > 기본값)
  const displayName = useMemo(
    () => (subjectName && subjectName.trim()) ?? subjectInfo?.name ?? '대상',
    [subjectName, subjectInfo?.name]
  );
  const displayAvatar = useMemo(
    () => subjectAvatarUrl ?? subjectInfo?.imageSource ?? profileImg,
    [subjectAvatarUrl, subjectInfo?.imageSource]
  );

  // 키보드 ESC로 닫기
  useEffect(() => {
    if (!isModalOpen) return;
    const onKey = e => {
      if (e.key === 'Escape') setIsModalOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isModalOpen]);

  // 모달 열리면 textarea에 포커스
  useEffect(() => {
    if (isModalOpen) setTimeout(() => textareaRef.current?.focus(), 40);
  }, [isModalOpen]);

  // FloatingButton에서 모달 열기 (전역 커스텀 이벤트)
  useEffect(() => {
    const onOpen = e => {
      if (e?.detail?.subjectId) setEventSubjectId(e.detail.subjectId);
      setIsModalOpen(true);
    };
    window.addEventListener('open-question-modal', onOpen);
    return () => window.removeEventListener('open-question-modal', onOpen);
  }, []);

  // 모달이 열려 있고 subjectId가 준비되면 대상 정보 로드
  useEffect(() => {
    if (!isModalOpen || !effectiveSubjectId) return;
    let ignore = false;
    (async () => {
      try {
        setSubjectLoading(true);
        const res = await instance.get(`/subjects/${effectiveSubjectId}/`);
        if (!ignore) setSubjectInfo(res.data); // { name, imageSource, ... }
      } catch (err) {
        console.warn('대상 정보 조회 실패:', err);
        if (!ignore) setSubjectInfo(null);
      } finally {
        if (!ignore) setSubjectLoading(false);
      }
    })();
    return () => {
      ignore = true;
    };
  }, [isModalOpen, effectiveSubjectId]);

  // 전송 핸들러
  const handleSend = useCallback(async () => {
    const body = question.trim();
    if (!body) {
      console.warn('[Send] blocked: empty content');
      return;
    }
    if (!effectiveSubjectId) {
      console.warn('[Send] blocked: missing subjectId');
      alert('어떤 주제(subject)에 질문을 붙일지 알려줘야 해요.');
      return;
    }

    setLoading(true);
    try {
      const res = await instance.post(
        `/subjects/${effectiveSubjectId}/questions/`,
        { content: body }
      );
      console.log('[Send] status', res.status); // 201 기대

      setQuestion('');
      setIsModalOpen(false);

      //  리로드 후 토스트를 띄우기 위한 플래그 저장
      sessionStorage.setItem('toast:newQuestion', '1');
      //  즉시 리로드 (대기시간 없음)
      window.location.reload();
    } catch (err) {
      console.error('질문 전송 실패:', err);
      alert('질문 전송에 실패했어요. 잠시 후 다시 시도해주세요.');
    } finally {
      setLoading(false);
    }
  }, [question, effectiveSubjectId]);

  return (
    <>
      {/* 모달: isModalOpen이 true일 때만 렌더 */}
      {isModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/65"
          onClick={() => setIsModalOpen(false)} // 배경 클릭 시 닫기
        >
          <div
            className="
              w-full max-w-[640px]
              max-h-[85vh] overflow-auto
              rounded-2xl bg-white p-6
              shadow-[0_12px_30px_rgba(0,0,0,0.25)]
            "
            role="dialog"
            aria-modal="true"
            aria-labelledby="q-title"
            onClick={e => e.stopPropagation()} // 모달 내부 클릭 시 닫힘 방지
          >
            {/* 헤더 */}
            <div className="mb-3 flex items-center justify-between">
              <div className="flex items-center gap-2 text-gray-900">
                <span className="text-[18px]" aria-hidden>
                  💬
                </span>
                <h1 id="q-title" className="py-3 m-0 text-[21px] font-bold ">
                  질문을 작성하세요
                </h1>
              </div>
              <button
                aria-label="모달 닫기"
                onClick={() => setIsModalOpen(false)}
                className="-mt-3 text-[40px] leading-none text-gray-900 hover:text-gray-600"
              >
                ×
              </button>
            </div>

            {/* To. 라인: 대상 이름/아바타 */}
            <div className="mb-3 flex items-center gap-2 text-[14px] text-gray-900">
              <span className="font-bold">To.</span>
              <img
                src={displayAvatar}
                alt=""
                onError={e => (e.currentTarget.src = profileImg)} // 이미지 실패 시 기본이미지
                className="h-[30px] w-[30px] rounded-full object-cover"
              />
              <span className="font-large">{displayName}</span>
              {subjectLoading && (
                <span className="ml-1 text-gray-400 text-[12px]">
                  (불러오는 중…)
                </span>
              )}
            </div>

            {/* 입력 */}
            <div className="mb-4">
              <textarea
                ref={textareaRef}
                placeholder="질문을 입력해주세요"
                value={question}
                onChange={e => setQuestion(e.target.value)}
                className="min-h-[150px] w-full resize-y rounded-xl border border-gray-200 bg-[#fafafa] p-3 text-sm text-gray-900 outline-blue-600 placeholder:text-gray-400"
              />
            </div>

            {/* 전송 버튼 */}
            <div>
              <button
                onClick={handleSend}
                disabled={!canSend}
                className={`h-12 w-full rounded-xl font-bold text-white ${
                  canSend
                    ? 'bg-[#6B4A2D] hover:brightness-110'
                    : 'cursor-not-allowed bg-[#D6CCC6]'
                }`}
              >
                {loading ? '전송 중...' : '질문 보내기'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
