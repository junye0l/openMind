import instance from './ApiAxios';

export const getQuestion = async subjectid => {
  const response = await instance.get(`/subjects/${subjectid}/questions/`);
  return response.data;
};

export const getQuestionList = async (subjectId, limit = 8, offset = 0) => {
  const response = await instance.get(
    `/subjects/${subjectId}/questions/?limit=${limit}&offset=${offset}`
  );
  return response.data;
};
