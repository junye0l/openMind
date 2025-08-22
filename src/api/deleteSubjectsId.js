import instance from './ApiAxios.js';

export const deleteSubjectsId = async subjectsId => {
  try {
    await instance.delete(`/subjects/${subjectsId}/`);
    return true;
  } catch (e) {
    throw new Error(`질문 대상 삭제 실패 : ${e.message}`);
  }
};
