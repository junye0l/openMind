import instance from './ApiAxios';

// 특정 subjectId의 질문 전체 조회
export const getQuestion = async subjectId => {
  const response = await instance.get(`/subjects/${subjectId}/questions/`);
  return response.data;
};

// 페이징 지원 질문 목록 조회
export const getQuestionList = async (subjectId, limit = 8, offset = 0) => {
  const response = await instance.get(
    `/subjects/${subjectId}/questions/?limit=${limit}&offset=${offset}`
  );
  return response.data;
};

// 질문 삭제 (엔드포인트: DELETE /questions/{questionId}/)
export const deleteQuestion = async questionId => {
  const response = await instance.delete(`/questions/${questionId}/`);
  return response.data;
};
