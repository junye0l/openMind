import { Link } from 'react-router-dom';
import Logo from '../../assets/images/logo.svg?react';
import FacebookShareButton from './ShareButton/FacebookShareButton';
import KakaoShareButton from './ShareButton/KakaoShareButton';
import CopyUrlButton from './ShareButton/CopyUrlButton';

function ProfileSection({ userInfo }) {
  return (
    <section className="absolute top-[50px] max-sm:top-[40px] flex justify-center flex-col items-center gap-[12px]">
      <Link to={'/list'}>
        <Logo alt="로고 이미지" className="max-sm:w-[124px] max-sm:h-[49px]" />
      </Link>
      <img
        className="w-[136px] h-[136px] max-sm:w-[104px] max-sm:h-[104px] rounded-full"
        src={userInfo.imageSource}
        alt="프로필"
      />
      <p className="text-[32px] max-sm:text-[24px]">{userInfo.name}</p>
      <div className="flex gap-[12px] justify-center">
        <CopyUrlButton />
        <KakaoShareButton userInfo={userInfo} />
        <FacebookShareButton />
      </div>
    </section>
  );
}

export default ProfileSection;
