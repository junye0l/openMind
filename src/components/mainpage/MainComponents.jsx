import logoImg from '../../assets/images/logo.svg';
import RightArrow from '../../assets/images/Arrow-right.svg';
import MainImg from '../../assets/images/main_bg.svg';
import UserIcon from '../../assets/images/user_icon.svg';

const MainComponents = () => {
  return (
    <div className="min-h-screen bg-[#F9F9F9] flex flex-col">
      {/* 상단 버튼 */}
      <div className="flex justify-end pt-6 pr-64 pb-6">
        <button className="flex items-center gap-2 mt-6 px-6 py-3 bg-[#F5F1EE] border border-[#542F1A] rounded-lg hover:bg-gray-100 text-base text-[#542F14]">
          질문하러 가기 <img src={RightArrow} alt="오른쪽 화살표" />
        </button>
      </div>

      {/* 중앙 콘텐츠 */}
      <div className="flex-1 flex flex-col items-center justify-center mt-20">
        <img src={logoImg} alt="메인로고" className="mb-6" />

        {/* 입력 폼 */}
        <div className="bg-white w-[400px] py-8 px-8 rounded-xl">
          <div className="flex flex-col items-center gap-4">
            <div className="relative w-full">
              <img
                src={UserIcon}
                alt="사용자 아이콘"
                className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5"
              />
              <input
                type="text"
                placeholder="이름을 입력하세요"
                className="pl-10 pr-4 py-3 border border-[#818181] rounded-lg w-full text-base"
              />
            </div>
            <button className="px-6 py-3 bg-[#542F1A] text-white rounded-lg w-full hover:bg-amber-800 text-base">
              질문 받기
            </button>
          </div>
        </div>
      </div>
      <img
        src={MainImg}
        alt="메인 배경"
        className="w-full h-80 object-cover block"
      />
    </div>
  );
};

export default MainComponents;
