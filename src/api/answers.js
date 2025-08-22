import instance from './ApiAxios';

// 답변 생성 (POST /questions/{questionId}/answers/)
export const createAnswer = (questionId, { content, isRejected = false }) => {
  return instance
    .post(`/questions/${questionId}/answers/`, {
      content,
      isRejected,
    })
    .then(res => res.data);
};

// 답변 조회 (GET /answers/{answerId}/)
export const getAnswer = answerId => {
  return instance.get(`/answers/${answerId}/`).then(res => res.data);
};

// 답변 삭제 (DELETE /answers/{answerId}/)
export const deleteAnswer = answerId => {
  return instance.delete(`/answers/${answerId}/`).then(() => true);
};

// 답변 수정
// PUT: 전체 교체(content, isRejected 모두 필요)
export const putAnswer = (answerId, { content, isRejected }) => {
  return instance
    .put(`/answers/${answerId}/`, { content, isRejected })
    .then(res => res.data);
};
// PATCH: 일부만 수정
export const patchAnswer = (answerId, partial) => {
  return instance.patch(`/answers/${answerId}/`, partial).then(res => res.data);
};
