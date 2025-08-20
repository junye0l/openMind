import React, { useState, useEffect, useRef } from 'react';
import profileImg from '../../assets/images/profile_img.svg';
import { useParams } from 'react-router-dom'; // ✅ ADD: 라우트에서 :id를 읽어오기 위해
import instance from '../../api/ApiAxios.js';
import { useNavigate } from 'react-router-dom';

// 1. 모달 표시/닫기 동작
// 2. 질문 입력 & 버튼 활성화 로직
// 3. API 연동

export default function QuestionModal({
  subjectId = null,
  onSent,
  subjectName,
  subjectAvatarUrl,
}) {
  const navigate = useNavigate();

  // 1) 모달을 열고 닫는 상태 (처음엔 닫혀 있음)
  const [isModalOpen, setIsModalOpen] = useState(false);

  // 2) 사용자가 쓴 질문 내용 저장
  const [question, setQuestion] = useState('');

  // 3) 전송 중인지 알려주는 상태
  const [loading, setLoading] = useState(false);

  // 🔧 ADD: 서버에서 가져온 대상 정보 & 로딩 상태
  const [subjectInfo, setSubjectInfo] = useState(null); // { id, name, imageSource, ... }
  const [subjectLoading, setSubjectLoading] = useState(false);

  // 🔧 ADD: 전역 이벤트로 넘어온 subjectId 저장
  const [eventSubjectId, setEventSubjectId] = useState(null);

  // ✅ ADD: 라우트 파라미터에서 :id 읽기 (페이지가 /subjects/:id 라면 자동 인식)
  const { id: routeId } = useParams();

  // 🔧 CHANGE: 우선순위 = props > 이벤트(detail) > 라우트
  const effectiveSubjectId =
    (subjectId ?? eventSubjectId ?? routeId ?? null) &&
    Number(subjectId ?? eventSubjectId ?? routeId);

  // textarea에 포커스 주려고 ref(참조) 사용
  const textareaRef = useRef(null);

  // 모달 열리면 textarea에 커서 자동으로 가게
  useEffect(() => {
    if (isModalOpen) {
      setTimeout(() => textareaRef.current?.focus(), 40);
    }
  }, [isModalOpen]);

  // ESC 누르면 모달 닫기
  useEffect(() => {
    function onKey(e) {
      if (e.key === 'Escape') setIsModalOpen(false);
    }
    if (isModalOpen) window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isModalOpen]);

  // ✅ ADD: 전역 이벤트로 모달 열기 (FloatingButton에서 dispatch)
  useEffect(() => {
    function onOpen(e) {
      // 🔧 CHANGE: FloatingButton에서 detail.subjectId 넘기면 우선 사용
      if (e?.detail?.subjectId) setEventSubjectId(e.detail.subjectId);
      setIsModalOpen(true);
    }
    window.addEventListener('open-question-modal', onOpen);
    return () => window.removeEventListener('open-question-modal', onOpen);
  }, []);

  // 🔧 ADD: 모달 열리고 id 있으면 대상 정보 GET /subjects/:id/
  useEffect(() => {
    if (!isModalOpen || !effectiveSubjectId) return;
    let ignore = false;
    (async () => {
      try {
        setSubjectLoading(true);
        const res = await instance.get(`/subjects/${effectiveSubjectId}/`);
        if (!ignore) setSubjectInfo(res.data); // { name, imageSource, ... }  ← 실제 키 확인
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

  // 질문 보내기 함수
  async function handleSend() {
    const body = question.trim();
    const finalSubjectId = Number(effectiveSubjectId);
    console.log('[Send] click', {
      bodyLen: body.length,
      subjectId: finalSubjectId,
    });
    if (!body) {
      console.warn('[Send] blocked: empty content');
      return;
    }
    if (!finalSubjectId) {
      console.warn('[Send] blocked: missing subjectId');
      alert('어떤 주제(subject)에 질문을 붙일지 알려줘야 해요.');
      return;
    }

    setLoading(true);
    try {
      // axios 인스턴스(baseURL: https://openmind-api.vercel.app/18-1)
      const res = await instance.post(
        `/subjects/${finalSubjectId}/questions/`,
        { content: body }
      );
      console.log('[Send] status', res.status); // 201 기대

      setQuestion('');
      setIsModalOpen(false);
      // 1) 부모에서 onSent 콜백 주면 먼저 호출 (에러 나도 무시)
      try {
        if (typeof onSent === 'function') onSent();
      } catch {
        /* noop */
      }

      // 2) 그리고 확실하게 리스트가 보이도록, 아주 짧은 지연 뒤 리로드
      //    (모달 닫힘 등 UI 업데이트가 반영된 뒤 리로드되게 함)
      setTimeout(() => {
        try {
          navigate(0); // React Router v6: 현재 경로 soft reload
        } catch {
          window.location.reload(); // 폴백: 전체 새로고침
        }
      }, 0);
    } catch (err) {
      console.error('질문 전송 실패:', err);
      alert('질문 전송에 실패했어요. 잠시 후 다시 시도해주세요.');
    } finally {
      setLoading(false);
    }
  }

  // 버튼 활성 여부 (공백만 있으면 비활성)
  const canSend = question.trim().length > 0 && !loading;

  // 🔧 ADD: To. 라인 표시값 (우선순위: props > 서버데이터 > 기본값)
  const displayName =
    (subjectName && subjectName.trim()) ?? subjectInfo?.name ?? '대상';

  const displayAvatar =
    subjectAvatarUrl ??
    subjectInfo?.imageSource ?? // ← 응답 키가 다르면 여기 수정
    profileImg;

  return (
    <>
      {/* 이제 FloatingButton → window.dispatchEvent 로만 연다. */}
      {/* 모달 영역 (isModalOpen이 true일 때만 렌더링) */}
      {isModalOpen && (
        // 배경 오버레이
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/65"
          onClick={() => setIsModalOpen(false)} // 배경 클릭 시 모달 닫기
        >
          {/* 모달 박스 */}
          <div
            className="w-[92%] max-w-[640px]          
    max-h-[85vh] overflow-auto         
    rounded-2xl bg-white p-6
    shadow-[0_12px_30px_rgba(0,0,0,0.25)]"
            onClick={e => e.stopPropagation()} // 모달 내부 클릭 시 닫힘 방지
            role="dialog"
            aria-modal="true"
            aria-labelledby="q-title"
          >
            {/* 헤더: 제목 + 닫기 버튼 */}
            <div className="mb-3 flex items-center justify-between">
              {/* 제목 왼쪽에 말풍선 아이콘 */}
              <div className="flex items-center gap-2 text-gray-900">
                <span className="text-[18px]" aria-hidden>
                  💬
                </span>
                <h1 id="q-title" className="py-3 m-0 text-[21px] font-bold">
                  질문을 작성하세요
                </h1>
              </div>
              {/* 닫기(X) 버튼 */}
              <button
                aria-label="모달 닫기"
                onClick={() => setIsModalOpen(false)}
                className="-mt-3 text-[40px] leading-none text-gray-900 hover:text-gray-600"
              >
                ×
              </button>
            </div>

            {/* To. 라인: 대상 이름/아바타 (props > 서버데이터 > 기본값) */}
            <div className="mb-3 flex items-center gap-2 text-[14px] text-gray-900">
              <span className="font-bold">To.</span>
              <img
                src={displayAvatar}
                alt=""
                onError={e => (e.currentTarget.src = profileImg)} // 🔧 ADD: 이미지 오류시 기본이미지
                className="h-[30px] w-[30px] rounded-full object-cover"
              />
              <span className="font-large">{displayName}</span>
              {subjectLoading && (
                <span className="ml-1 text-gray-400 text-[12px]">
                  (불러오는 중…)
                </span>
              )}
            </div>

            {/* 입력창: 연회색 배경, 옅은 테두리, 포커스 시 파란 외곽선 */}
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
                className={`h-12 w-full rounded-xl font-bold text-white transition ${
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
