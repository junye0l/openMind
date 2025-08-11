import { Link } from "react-router-dom";

export default function 메인페이지() {
  return (
    <>
      <div>메인페이지</div>
      <Link to="list">리스트</Link>
      <Link to="/list/1">개별피드</Link>
      <Link to="/list/1/answer">답변하기</Link>
      <Link to="/modal">모달</Link>
    </>
  );
}
