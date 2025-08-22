import { Link } from 'react-router-dom';
import Logo from '../../assets/images/logo.svg?react';
import FacebookShareButton from './ShareButton/FacebookShareButton';
import KakaoShareButton from './ShareButton/KakaoShareButton';
import CopyUrlButton from './ShareButton/CopyUrlButton';

function ProfileSection({ userInfo }) {
  return (
    <section className="absolute top-[50px] mobile:top-[40px] flex justify-center flex-col items-center gap-[12px]">
      <Link to={'/list'}>
        <Logo alt="로고 이미지" className="mobile:w-[124px] mobile:h-[49px]" />
      </Link>
      <img
        className="w-[136px] h-[136px] mobile:w-[104px] mobile:h-[104px] rounded-full"
        src={userInfo.imageSource}
      />
      <p className="text-[32px] mobile:text-[24px]">{userInfo.name}</p>
      <div className="flex gap-[12px] justify-center">
        <CopyUrlButton />
        <KakaoShareButton userInfo={userInfo} />
        <FacebookShareButton />
      </div>
    </section>
  );
}

export default ProfileSection;
