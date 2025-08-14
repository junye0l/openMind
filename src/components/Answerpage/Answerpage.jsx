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

function Answerpage() {
  return (
    <div className="min-h-screen w-full bg-white">
      {/* 헤더 배경 */}
      <header className="relative w-full">
        <div
          className="w-full h-[234px] bg-no-repeat bg-center bg-cover"
          style={{ backgroundImage: `url(${heroBg})` }}
        />
        {/* 중앙 정렬 스택 */}
        <div className="absolute inset-x-0 top-[50px] z-10 flex flex-col items-center gap-3">
          <div className="w-[170px] h-[67px] flex items-center justify-center">
            <img src={logo} alt="OpenMind" className="max-w-full max-h-full" />
          </div>
          {/* 프로필 */}
          <div className="w-[136px] h-[136px] rounded-full overflow-hidden ring-4 ring-white shadow">
            <img
              src={profileImg}
              alt="프로필"
              className="w-full h-full object-cover"
            />
          </div>
          {/* 사용자명 */}
          <div className="w-[177px] h-[40px] flex items-center justify-center">
            <span className="text-[18px] font-semibold leading-none">
              아초는고양이
            </span>
          </div>
          {/* 링크 아이콘 */}
          <div className="w-[144px] h-[40px] flex items-center justify-center gap-2">
            <img src={linkIcon} alt="링크" className="h-5 w-5" />
            <img src={KakaoIcon} alt="카카오톡" className="h-5 w-5" />
            <img src={FacebookIcon} alt="페이스북" className="h-5 w-5" />
          </div>
        </div>
      </header>

      {/* 헤더 겹침 보정 */}
      <div className="h-[140px]" />

      {/* 섹션 래퍼 */}
      <main className="w-full px-[242px] pt-0 pb-[140px]">
        <section className="w-full max-w-[1120px] mx-auto rounded-2xl border border-[#E5DCD5] bg-[#EFE7E1] shadow-sm p-6">
          <div className="w-[216px] h-[25px] mx-auto rounded-full bg-[#EADFD8] text-[#5A4B41] text-[13px] font-semibold flex items-center justify-center mb-4">
            3개의 질문이 있습니다
          </div>

          {/* 추가해서 카드 개수 늘리기 */}
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
    <article className="mx-auto my-6 w-[684px] h-[543px] rounded-2xl bg-white ring-1 ring-[#E5DCD5] shadow-sm overflow-hidden">
      <div className="w-full h-full p-8 flex flex-col items-center">
        <div className="w-[620px] h-[26px] flex items-center justify-between">
          <div
            role="button"
            tabIndex={0}
            className="inline-flex h-6 items-center rounded-full border border-[#E5DCD5] bg-[#F6F1ED] px-3 text-[12px] font-semibold text-[#50433A] cursor-default select-none"
          >
            미답변
          </div>
          <div
            role="button"
            tabIndex={0}
            className="h-6 w-6 flex items-center justify-center rounded-full hover:bg-black/5 cursor-pointer"
          >
            <img src={moreIcon} alt="더보기" className="h-4 w-4" />
          </div>
        </div>

        <div className="h-4" />

        <div className="w-[620px] h-[46px] flex flex-col justify-between">
          <div className="text-[12px] text-[#8A7D74]">질문 · 2주전</div>
          <div className="text-[18px] font-semibold text-[#2B211B] leading-6">
            좋아하는 동물은?
          </div>
        </div>

        <div className="h-4" />

        <div className="w-[620px] h-[268px] rounded-xl border border-[#E5DCD5] bg-[#FAF8F7] p-4 flex flex-col justify-between">
          <div className="flex gap-3">
            <div className="h-12 w-12 rounded-full overflow-hidden bg-[#E9E4E1] flex-shrink-0">
              <img
                src={profileImg}
                alt=""
                className="w-full h-full object-cover"
              />
            </div>

            {/* 텍스트 입력 영역 */}
            <div className="flex-1">
              <div className="text-[14px] font-medium mb-2 text-[#2B211B]">
                아초는고양이
              </div>
              <div className="h-[120px]">
                <textarea
                  value={text}
                  onChange={e => setText(e.target.value)}
                  placeholder="답변을 입력해주세요"
                  className="h-full w-full resize-none rounded-lg border border-[#E5DCD5] bg-white px-3 py-2 text-[14px] text-[#6F6259] outline-none"
                />
              </div>
            </div>
          </div>

          {/* 7~8) 답변 완료 버튼 입력 시에만 활성화 */}
          <div
            role="button"
            tabIndex={0}
            className={`w-full h-11 rounded-lg flex items-center justify-center text-[14px] font-semibold ${
              text.trim()
                ? 'bg-[#5B3A2E] text-white cursor-pointer'
                : 'bg-[#CDBFB5] text-white/80 cursor-not-allowed'
            }`}
          >
            답변 완료
          </div>
        </div>

        <div className="h-4" />

        {/* 좋아요/싫어요 버튼 */}
        <div className="w-[620px] h-[43px] flex items-center gap-3">
          <div
            role="button"
            tabIndex={0}
            className="h-9 px-3 inline-flex items-center gap-2 rounded-lg border border-[#E5DCD5] bg-white text-[14px] text-[#6F6259] hover:bg-black/5 cursor-pointer"
          >
            <img src={thumbsUp} alt="" className="h-4 w-4" />
            좋아요
          </div>
          <div
            role="button"
            tabIndex={0}
            className="h-9 px-3 inline-flex items-center gap-2 rounded-lg border border-[#E5DCD5] bg-white text-[14px] text-[#6F6259] hover:bg-black/5 cursor-pointer"
          >
            <img src={thumbsDown} alt="" className="h-4 w-4" />
            싫어요
          </div>
        </div>
      </div>
    </article>
  );
}

export default Answerpage;
