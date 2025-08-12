import React, { useState, useEffect, useRef } from 'react';

// 1. 모달 표시/닫기 동작
// 2. 질문 입력 & 버튼 활성화 로직
// 3. API 연동

// 실습용 API 주소
const API_BASE = 'https://openmind-api.vercel.app/18-1';

export default function QuestionModal({ subjectId = null, onSent = () => {} }) {
  // 1) 모달을 열고 닫는 상태 (처음엔 닫혀 있음)
  const [isModalOpen, setIsModalOpen] = useState(false);

  // 2) 사용자가 쓴 질문 내용 저장
  const [question, setQuestion] = useState('');

  // 3) 전송 중인지 알려주는 상태
  const [loading, setLoading] = useState(false);

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

  // 질문 보내기 함수
  async function handleSend() {
    const body = question.trim();
    if (!body) return; // 내용 없으면 아무것도 안함

    if (!subjectId) {
      alert('어떤 주제(subject)에 질문을 붙일지 알려줘야 해요.');
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/subjects/${subjectId}/questions/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content: body }),
      });

      if (!res.ok) {
        // 서버가 문제 있다고 알려주면 오류 처리
        const text = await res.text().catch(() => '서버 오류');
        throw new Error(text || '전송 실패');
      }

      // 성공하면 입력 초기화하고 모달 닫고 부모에게 알려줌
      setQuestion('');
      setIsModalOpen(false);
      onSent(); // 부모가 목록 갱신하도록 알려줌
    } catch (err) {
      console.error('질문 전송 실패:', err);
      alert('질문 전송에 실패했어요. 잠시 후 다시 시도해주세요.');
    } finally {
      setLoading(false);
    }
  }

  // 버튼 활성 여부 (공백만 있으면 비활성)
  const canSend = question.trim().length > 0 && !loading;

  // 아주 기본적인 스타일 (디자인은 나중)
  const overlay = {
    position: 'fixed',
    inset: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'rgba(0,0,0,0.4)',
  };
  const box = {
    background: '#fff',
    padding: 20,
    borderRadius: 8,
    width: '90%',
    maxWidth: 520,
  };
  const textareaStyle = { width: '100%', minHeight: 120, padding: 8 };

  return (
    <>
      {/* 모달 여는 버튼 */}
      <button onClick={() => setIsModalOpen(true)}>질문 작성하기</button>

      {/* 모달 (isModalOpen이 true일 때만 화면에 보임) */}
      {isModalOpen && (
        <div style={overlay} onClick={() => setIsModalOpen(false)}>
          {/* 모달 박스 안을 클릭하면 바깥 클릭 이벤트가 전파되는 걸 막음 (모달이 안 닫히게) */}
          <div style={box} onClick={e => e.stopPropagation()}>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <h3 style={{ margin: 0 }}>질문 작성</h3>
              <button onClick={() => setIsModalOpen(false)}>X</button>
            </div>

            <div style={{ marginTop: 12 }}>
              <textarea
                ref={textareaRef}
                placeholder="질문을 작성하세요"
                value={question}
                onChange={e => setQuestion(e.target.value)}
                style={textareaStyle}
              />
            </div>

            <div style={{ marginTop: 12, textAlign: 'right' }}>
              <button
                onClick={() => setIsModalOpen(false)}
                style={{ marginRight: 8 }}
              >
                취소
              </button>
              <button
                onClick={handleSend}
                disabled={!canSend}
                style={{
                  background: canSend ? '#2563EB' : '#9CA3AF',
                  color: 'white',
                  padding: '6px 12px',
                  border: 'none',
                  cursor: canSend ? 'pointer' : 'default',
                }}
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
