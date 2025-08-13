import heroBg from '../../assets/images/main_bg.svg';
import logo from '../../assets/images/logo.svg';
import profileImg from '../../assets/images/profile_img.svg';
import linkIcon from '../../assets/images/Link.svg';
import KakaoIcon from '../../assets/images/Kakaotalk.svg';
import FacebookIcon from '../../assets/images/Facebook.svg';

function Answerpage() {
  return (
    <div className="min-h-screen w-full bg-white">
      {/*헤더 배경*/}
      <header className="relative w-full">
        <div
          className="w-full h-[234px] bg-no-repeat bg-center bg-cover"
          style={{ backgroundImage: `url(${heroBg})` }}
        />

        {/*중앙 정렬*/}
        <div className="absolute inset-x-0 top-[50px] z-10 flex flex-col items-center gap-3">
          <div className="w-[170px] h-[67px] flex items-center justify-center">
            <img src={logo} alt="OpenMind" className="max-w-full max-h-full" />
          </div>

          {/* 2) 프로필 이미지*/}
          <div className="w-[136px] h-[136px] rounded-full overflow-hidden ring-4 ring-white shadow">
            <img
              src={profileImg}
              alt="프로필"
              className="w-full h-full object-cover"
            />
          </div>

          {/* 사용자명 요소 */}
          <div className="w-[177px] h-[40px] flex items-center justify-center">
            <span className="text-[18px] font-semibold leading-none">
              아초는고양이
            </span>
          </div>

          {/*링크 아이콘*/}
          <div className="w-[144px] h-[40px] flex items-center justify-center">
            <a
              href="#"
              className="inline-flex h-8 w-8 items-center justify-center rounded-full hover:opacity-80"
              aria-label="링크"
            >
              <img src={linkIcon} alt="" className="h-5 w-5" />
              <img src={KakaoIcon} alt="" className="h-5 w-5" />
              <img src={FacebookIcon} alt="" className="h-5 w-5" />
            </a>
          </div>
        </div>
      </header>

      {/* 헤더와 겹치는 영역만큼 여백 보정 (스택이 내려오는 만큼 공간 확보) */}
      <div className="h-[140px]" />

      {/* 아래 콘텐츠 래퍼(섹션/카드 등 넣을 자리) */}
      <main className="w-full px-[242px] pt-[0px] pb-[140px]">
        {/* 예시 컨텐츠 필요 시 교체 */}
        <section className="w-full max-w-[1120px] mx-auto rounded-2xl border border-[#E5DCD5] bg-[#EFE7E1] shadow-sm p-6">
          <div className="w-[216px] h-[25px] mx-auto rounded-full bg-[#EADFD8] text-[#5A4B41] text-[13px] font-semibold flex items-center justify-center mb-4">
            3개의 질문이 있습니다
          </div>

          {/* 카드 들어갈 자리 */}
          <div className="w-[684px] h-[543px] mx-auto rounded-2xl ring-1 ring-[#E5DCD5] bg-white shadow-sm" />
        </section>
      </main>
    </div>
  );
}

export default Answerpage;
