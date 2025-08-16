import api from './ApiAxios';

// user 정보 조회 (get)
export const getSubject = async subjectid => {
  const response = await api.get(`subjects/${subjectid}/`);
  return response.data;
};
