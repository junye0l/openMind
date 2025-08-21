import { useNavigate, Link } from 'react-router-dom';

const NotFoundButtons = () => {
  const nav = useNavigate();

  return (
    <div className="flex flex-col gap-4">
      <Link to="/">
        <button className="px-6 py-3 bg-bn-40 text-white rounded-lg hover:bg-bn-50 transition-colors">
          메인 페이지로 돌아가기
        </button>
      </Link>
      <button
        className="px-6 py-3 bg-gs-40 text-white rounded-lg hover:bg-gs-50 transition-colors"
        onClick={() => nav(-1)}
      >
        이전 페이지로 돌아가기
      </button>
    </div>
  );
};

export default NotFoundButtons;
