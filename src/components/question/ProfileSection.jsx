import profileImg from '../../assets/images/profile_img.svg';
import logo from '../../assets/images/logo.svg';
import LinkImg from '../../assets/images/Link.svg?react';
import KakaoImg from '../../assets/images/Kakaotalk.svg?react';
import FacebookImg from '../../assets/images/Facebook.svg?react';

function ProfileSection() {
  return (
    <section className="absolute top-[50px] flex justify-center flex-col items-center gap-[12px]">
      <img className="" src={logo} alt="로고 이미지" />
      <img className="w-[136px]" src={profileImg} alt="" />
      <p className="text-[32px] ">아초는고양이</p>
      <div className="flex gap-[12px]">
        <div className="p-[11px] bg-bn-40 flex justify-center items-center rounded-full">
          <LinkImg className="fill-gs-10" />
        </div>
        <div className="p-[11px] bg-y50 flex justify-center items-center rounded-full">
          <KakaoImg className="fill-gs-60" />
        </div>
        <div className="p-[11px] bg-b50 flex justify-center items-center rounded-full">
          <FacebookImg className="fill-gs-10" />
        </div>
      </div>
    </section>
  );
}

export default ProfileSection;
