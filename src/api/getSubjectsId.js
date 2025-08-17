import instance from './ApiAxios.js';

// 특정 질문 대상 조회
export const getSubjectsId = async subjectsId => {
  try {
    const response = await instance.get(`/subjects/${subjectsId}/`);
    return response.data;
  } catch (e) {
    throw new Error(`질문 대상 조회 실패 : ${e.message}`);
  }
};
