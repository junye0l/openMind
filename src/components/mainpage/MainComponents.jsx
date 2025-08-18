import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { postSubjectsId } from '../../api/postSubjectsId';
import RightArrow from '../../assets/images/Arrow-right.svg';
import logoImg from '../../assets/images/logo.svg';
import MainImg from '../../assets/images/main_bg.svg';
import UserIcon from '../../assets/images/user_icon.svg';

const MainComponents = () => {
  const [name, setName] = useState(''); // 입력된 이름 상태
  const [isLoading, setIsLoading] = useState(false); // 로딩 상태
  const navigate = useNavigate();

  // 질문 받기 버튼 클릭 핸들러
  const handleSubmit = async () => {
    const trimmedName = name.trim();

    // 이름이 비어있으면 처리하지 않음
    if (!trimmedName) {
      alert('이름을 입력해주세요.');
      return;
    }

    setIsLoading(true);

    try {
      // 새로운 피드 생성
      await postSubjectsId({ name: trimmedName });
      navigate('/list');
    } catch (error) {
      console.error('피드 생성 실패:', error);
      alert('피드 생성에 실패했습니다. 다시 시도해주세요.');
    } finally {
      setIsLoading(false);
    }
  };

  // Enter 키 입력 시 질문 받기 실행
  const handleKeyPress = e => {
    if (e.key === 'Enter' && !isLoading) {
      handleSubmit();
    }
  };

  return (
    <div className="min-h-screen bg-gs-20 flex flex-col">
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-6">
        <div className="hidden md:block self-end mb-auto pr-8 md:pr-12 lg:pr-16 mt-6 md:mt-8">
          <button
            onClick={() => navigate('/list')}
            className="flex items-center gap-2 px-4 py-2 md:px-6 md:py-3 bg-bn-10 border border-bn-40 rounded-lg hover:bg-gray-100 text-sm md:text-base text-bn-40"
          >
            질문하러 가기{' '}
            <img
              src={RightArrow}
              alt="오른쪽 화살표"
              className="w-3 h-3 md:w-4 md:h-4"
            />
          </button>
        </div>

        <div className="flex flex-col items-center mt-auto mb-auto">
          <img
            src={logoImg}
            alt="메인로고"
            className="w-[456px] mb-6 md:mb-7 lg:mb-8 h-[100px] md:h-auto"
          />

          <button
            onClick={() => navigate('/list')}
            className="md:hidden flex items-center gap-2 px-4 py-2 mb-6 bg-bn-10 border border-bn-40 rounded-lg hover:bg-gray-100 text-sm text-bn-40"
          >
            질문하러 가기{' '}
            <img src={RightArrow} alt="오른쪽 화살표" className="w-3 h-3" />
          </button>

          <div className="bg-gs-10 w-full max-w-[350px] md:max-w-[380px] lg:max-w-[400px] py-6 px-6 md:py-7 md:px-7 lg:py-8 lg:px-8 rounded-xl">
            <div className="flex flex-col items-center gap-3 md:gap-3.5 lg:gap-4">
              <div className="relative w-full">
                <img
                  src={UserIcon}
                  alt="사용자 아이콘"
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 md:w-4.5 md:h-4.5 lg:w-5 lg:h-5"
                />
                <input
                  type="text"
                  placeholder="이름을 입력하세요"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  onKeyDown={handleKeyPress}
                  disabled={isLoading}
                  className="pl-10 pr-4 py-2.5 md:py-2.5 lg:py-3 border border-gs-40 rounded-lg w-full text-sm md:text-sm lg:text-base disabled:opacity-50"
                />
              </div>
              <button
                onClick={handleSubmit}
                disabled={isLoading || !name.trim()}
                className="px-4 py-2.5 md:px-5 md:py-2.5 lg:px-6 lg:py-3 bg-bn-40 text-gs-10 rounded-lg w-full hover:bg-amber-800 text-sm md:text-sm lg:text-base disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? '처리 중...' : '질문 받기'}
              </button>
            </div>
          </div>
        </div>
      </div>

      <img src={MainImg} alt="메인 배경" className="w-full h-auto block" />
    </div>
  );
};

export default MainComponents;
