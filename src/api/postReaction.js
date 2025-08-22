import instance from './ApiAxios';

export const postReaction = async (id, type) => {
  const response = await instance.post(`/questions/${id}/reaction/`, type);
  return response.data;
};
