import instance from './ApiAxios';

export const getQuestion = async (subjectid, content) => {
  const response = await instance.get(
    `subjects/${subjectid}/question/`,
    content
  );
  return response.data;
};
