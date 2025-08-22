import instance from './ApiAxios';

export const postSubjectsId = async name => {
  try {
    console.log('전송할 데이터:', { name });
    const res = await instance.post(`/subjects/`,  name );
    const body = res.data;
    localStorage.setItem('id', body.id);
    return body;
  } catch (e) {
    throw new Error(`메인 id요청 실패 : ${e}`);
  }
};
