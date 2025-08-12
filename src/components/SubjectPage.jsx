import React, { useState, useEffect } from 'react';
import QuestionModal from './QuestionModal'; // QuestionModal 컴포넌트를 import

const API_BASE = 'https://openmind-api.vercel.app/18-1'; // API 주소

export default function SubjectPage({ subjectId }) {
  const [questions, setQuestions] = useState([]); // 질문 목록 상태 (초기값은 빈 배열)
  const [loading, setLoading] = useState(true); // 로딩 상태 (데이터가 로드 중인지 확인)

  // 질문 목록을 서버에서 받아오는 함수
  const fetchQuestions = async () => {
    setLoading(true); // 로딩 상태 시작
    try {
      const response = await fetch(
        `${API_BASE}/subjects/${subjectId}/questions/`
      ); // 서버에 GET 요청
      const data = await response.json(); // 서버에서 받은 데이터를 JSON 형식으로 파싱
      setQuestions(data); // 받아온 질문 데이터를 상태에 저장
    } catch (error) {
      console.error('질문 목록 로드 실패:', error); // 오류 처리
    } finally {
      setLoading(false); // 로딩 상태 종료
    }
  };

  useEffect(() => {
    fetchQuestions(); // 페이지가 처음 렌더링될 때 질문 목록을 불러옴
  }, [subjectId]); // `subjectId`가 변경될 때마다 새로 데이터를 불러옴

  return (
    <div>
      <h1>질문 목록</h1> {/* 제목 */}
      {/* 로딩 중일 때 표시 */}
      {loading ? (
        <p>로딩 중...</p>
      ) : (
        <ul>
          {/* 받아온 질문들을 목록으로 표시 */}
          {questions.map(question => (
            <li key={question.id}>{question.content}</li> // 각 질문을 <li>로 표시
          ))}
        </ul>
      )}
      {/* 질문 작성 모달 컴포넌트 */}
      <QuestionModal subjectId={subjectId} onSent={fetchQuestions} />
    </div>
  );
}
