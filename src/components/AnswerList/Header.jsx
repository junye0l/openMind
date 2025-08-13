import { Link } from 'react-router-dom';
import Button from './Button';
import LogoImg from './LogoImg';

export default function Header() {
  const id = localStorage.getItem("id");
  const NaviPath = id ? `post/${id}/answer` : '/';

  return (
    <header className='flex justify-between items-center'>
      <Link to="/">
        <LogoImg />
      </Link>
      <Link to={NaviPath}>
        <Button>답변하러 가기</Button>
      </Link>
    </header>
  );
}
