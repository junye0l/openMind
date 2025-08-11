// import { useState } from 'react';
import mainBg from '../assets/images/main_bg.svg';
import profileImg from '../assets/images/profile_img.svg';
import logo from '../assets/images/logo.svg';
import linkImg from '../assets/images/Link.svg';
import kakaoImg from '../assets/images/Kakaotalk.svg';
import facebookImg from '../assets/images/Facebook.svg';

function AnswerQuestion() {
  const questions = ['임시 질문1', '임시 질문2', '임시 질문3'];

  return (
    <div className="relative flex flex-col items-center">
      <header className="w-full h-full flex flex-col items-center">
        <img className="w-full h-[234px]" src={mainBg} alt="배경화면" />
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
      </header>
      <main className="flex flex-col justify-center items-center rounded-[16px] w-[716px] mt-[189px] bg-[#C7bbb5]">
        <h1 className="m-[16px]">*개의 질문이 있습니다.</h1>
        <div>
          {questions.map((question, index) => (
            <div
              key={index}
              className="w-[684px] m-[20px] mt-[0] bg-[#ffffff] rounded-[16px]"
            >
              {question}
            </div>
          ))}
        </div>
      </main>
      <div className="fixed bottom-[24px] right-[24px]">
        <button className="px-[49.5px] py-[14.5px] bg-[#542f1a] rounded-full">
          질문 작성하기
        </button>
      </div>
    </div>
  );
}

export default AnswerQuestion;
