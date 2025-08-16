import { Link } from 'react-router-dom';
import Logo from '../../assets/images/logo.svg?react';
import LinkImg from '../../assets/images/Link.svg?react';
import KakaoImg from '../../assets/images/Kakaotalk.svg?react';
import FacebookImg from '../../assets/images/Facebook.svg?react';

function ProfileSection({ userInfo }) {
  return (
    <section className="absolute top-[50px] flex justify-center flex-col items-center gap-[12px]">
      <Link to={'/list'}>
        <Logo alt="로고 이미지" />
      </Link>
      <img
        className="w-[136px] h-[136px] rounded-full"
        src={userInfo.imageSource}
      />
      <p className="text-[32px] ">{userInfo.name}</p>
      <div className="flex gap-[12px]">
        <button className="p-[11px] bg-bn-40 flex justify-center items-center rounded-full">
          <LinkImg className="fill-gs-10" />
        </button>
        <button className="p-[11px] bg-y50 flex justify-center items-center rounded-full">
          <KakaoImg className="fill-gs-60" />
        </button>
        <button className="p-[11px] bg-b50 flex justify-center items-center rounded-full">
          <FacebookImg className="fill-gs-10" />
        </button>
      </div>
    </section>
  );
}

export default ProfileSection;
