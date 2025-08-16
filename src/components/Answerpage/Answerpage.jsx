// src/components/Answerpage.jsx
import { useState } from 'react';

import heroBg from '../../assets/images/main_bg.svg';
import logo from '../../assets/images/logo.svg';
import profileImg from '../../assets/images/profile_img.svg';

import moreIcon from '../../assets/images/More.svg';
import linkIcon from '../../assets/images/Link.svg';
import KakaoIcon from '../../assets/images/Kakaotalk.svg';
import FacebookIcon from '../../assets/images/Facebook.svg';
import thumbsUp from '../../assets/images/thumbs-up.svg';
import thumbsDown from '../../assets/images/thumbs-down.svg';
import messagesIcon from '../../assets/images/Messages.svg';

export default function Answerpage() {
  return (
    <div className="min-h-screen w-full bg-gs-10">
      {/* 헤더 */}
      <header className="relative w-full">
        <div
          className="w-full h-[234px] bg-no-repeat bg-center bg-cover"
          style={{ backgroundImage: `url(${heroBg})` }}
        />
        {/* 중앙 스택 */}
        <div className="absolute inset-x-0 top-[50px] z-10 flex flex-col items-center gap-3">
          {/* openmind */}
          <div className="w-[170px] h-[67px] flex items-center justify-center">
            <img src={logo} alt="OpenMind" className="max-w-full max-h-full" />
          </div>
          {/* 프로필 */}
          <div className="w-[136px] h-[136px] rounded-full overflow-hidden ring-4 ring-gs-10 shadow">
            <img
              src={profileImg}
              alt="프로필"
              className="w-full h-full object-cover"
            />
          </div>
          {/* 사용자명*/}
          <div className="w-[177px] h-[40px] flex items-center justify-center">
            <span className="text-[18px] font-semibold leading-none text-bn-50">
              아초는고양이
            </span>
          </div>
          {/* SNS 링크 */}
          <div className="w-[144px] h-[40px] flex items-center justify-center gap-2">
            <img src={linkIcon} alt="링크" className="h-5 w-5" />
            <img src={KakaoIcon} alt="카카오톡" className="h-5 w-5" />
            <img src={FacebookIcon} alt="페이스북" className="h-5 w-5" />
          </div>
        </div>
      </header>

      {/* 삭제하기 버튼  */}
      <div className="w-full px-[242px] mt-[150px] mb-[10px]">
        <div className="max-w-[1120px] mx-auto flex justify-end">
          <div
            role="button"
            tabIndex={0}
            className="w-[100px] h-[35px] rounded-full bg-bn-40 text-gs-10 text-sm font-medium flex items-center justify-center hover:opacity-90"
          >
            삭제하기
          </div>
        </div>
      </div>

      {/* 섹션 래퍼 */}
      <main className="w-full px-[242px] pb-[140px]">
        <section className="w-full max-w-[1120px] mx-auto rounded-2xl border border-bn-20 bg-bn-10 shadow-sm p-6">
          <div className="w-[216px] h-[25px] mx-auto  bg-bn-10 text-bn-40 text-[13px] font-semibold flex items-center justify-center gap-1.5 mb-4">
            <img src={messagesIcon} alt="" className="w-4 h-4" />
            3개의 질문이 있습니다
          </div>

          {/* 카드들 */}
          <AnswerCard />
          <AnswerCard />
        </section>
      </main>
    </div>
  );
}

function AnswerCard() {
  const [text, setText] = useState('');

  return (
    <article className="mx-auto my-6 w-[684px] h-[543px] rounded-2xl bg-gs-10 ring-1 ring-bn-20 shadow-sm overflow-hidden">
      <div className="w-full h-full p-8 flex flex-col items-center">
        <div className="w-[620px] h-[26px] flex items-center justify-between">
          <div
            role="button"
            tabIndex={0}
            className="inline-flex h-6 items-center rounded-full bg-bn-10 px-3 text-[12px] font-semibold text-bn-40 cursor-default select-none ring-1 ring-bn-20"
          >
            미답변
          </div>
          <div
            role="button"
            tabIndex={0}
            className="h-6 w-6 flex items-center justify-center rounded-full hover:bg-gs-20 cursor-pointer"
          >
            <img src={moreIcon} alt="더보기" className="h-4 w-4" />
          </div>
        </div>

        <div className="h-4" />

        <div className="w-[620px] h-[46px] flex flex-col justify-between">
          <div className="text-[12px] text-gs-40">질문 · 2주전</div>
          <div className="text-[18px] font-semibold text-bn-50 leading-6">
            좋아하는 동물은?
          </div>
        </div>

        <div className="h-4" />

        {/* 본문 박스*/}
        <div className="w-[620px] h-[268px] rounded-xl border border-bn-20 bg-bn-10 p-4 flex flex-col justify-between">
          <div className="flex gap-3">
            {/* 프로필 */}
            <div className="h-12 w-12 rounded-full overflow-hidden bg-bn-20 flex-shrink-0">
              <img
                src={profileImg}
                alt=""
                className="w-full h-full object-cover"
              />
            </div>

            <div className="flex-1">
              <div className="text-[14px] font-medium mb-2 text-bn-50">
                아초는고양이
              </div>

              {/* 입력창 */}
              <div className="w-[520px] h-[120px]">
                <textarea
                  value={text}
                  onChange={e => setText(e.target.value)}
                  placeholder="답변을 입력해주세요"
                  className="h-full w-full resize-none rounded-lg bg-gs-20 border border-gs-30 px-3 py-2 text-[14px] text-gs-50 outline-none"
                />
              </div>
            </div>
          </div>

          {/* 답변 완료 버튼 */}
          <div className="ml-[60px]">
            <div
              role="button"
              tabIndex={0}
              className={`w-[520px] h-11 rounded-lg flex items-center justify-center text-[14px] font-semibold ${
                text.trim()
                  ? 'bg-bn-40 text-gs-10 cursor-pointer'
                  : 'bg-bn-30 text-gs-10/80 cursor-not-allowed'
              }`}
              aria-disabled={!text.trim()}
              onClick={() => {
                if (!text.trim()) return;
                console.log('제출:', text);
              }}
            >
              답변 완료
            </div>
          </div>
        </div>

        <div className="h-4" />

        {/* 좋아요/싫어요 */}
        <div className="w-[620px] h-[43px] flex items-center gap-3">
          <div
            role="button"
            tabIndex={0}
            className="h-9 px-3 inline-flex items-center gap-2 rounded-lg bg-gs-10 text-[14px] text-gs-50 hover:bg-gs-20 cursor-pointer"
          >
            <img src={thumbsUp} alt="" className="h-4 w-4" />
            좋아요
          </div>
          <div
            role="button"
            tabIndex={0}
            className="h-9 px-3 inline-flex items-center gap-2 rounded-lg bg-gs-10 text-[14px] text-gs-50 hover:bg-gs-20 cursor-pointer"
          >
            <img src={thumbsDown} alt="" className="h-4 w-4" />
            싫어요
          </div>
        </div>
      </div>
    </article>
  );
}
