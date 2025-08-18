import instance from './ApiAxios';

export const getQuestion = async subjectid => {
  const response = await instance.get(`/subjects/${subjectid}/questions/`);
  return response.data;
};
