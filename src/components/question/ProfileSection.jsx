import React from 'react';
import profileImg from '../../assets/images/profile_img.svg';
import logo from '../../assets/images/logo.svg';
import linkImg from '../../assets/images/Link.svg';
import kakaoImg from '../../assets/images/Kakaotalk.svg';
import facebookImg from '../../assets/images/Facebook.svg';

function ProfileSection() {
  return (
    <section className="absolute top-[50px] flex justify-center flex-col items-center gap-[12px]">
      <img className="" src={logo} alt="로고 이미지" />
      <img className="w-[136px]" src={profileImg} alt="" />
      <p>아초는고양이</p>
      <div className="flex gap-[12px]">
        <div className="p-[11px] bg-[#542f1a] flex justify-center items-center rounded-full">
          <img className="stroke-white" src={linkImg} alt="프로필 링크" />
        </div>
        <div className="p-[11px] bg-[#fee500] flex justify-center items-center rounded-full">
          <img src={kakaoImg} alt="카카오톡 링크" />
        </div>
        <div className="p-[11px] bg-[#1877f2] flex justify-center items-center rounded-full">
          <img src={facebookImg} alt="페이스북 링크" />
        </div>
      </div>
    </section>
  );
}

export default ProfileSection;
