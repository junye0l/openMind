import instance from './ApiAxios';

export const postReaction = async (id, type) => {
  const response = await instance.post(`question/${id}/reaction/`, type);
  return response.data;
};
