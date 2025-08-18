import instance from "./ApiAxios";

export const getSubjects = async ({limit, page}) => {
  try {
    const offset = (page - 1) * limit;
    const res = await instance.get(`/subjects/?limit=${limit}&offset=${offset}`);
    const body = res.data;
    return {results : body.results, totalPages : Math.ceil(body.count / limit)};
  } catch (e) {
    throw new Error(`리스트 요청 실패 : ${e}`);
  }
}