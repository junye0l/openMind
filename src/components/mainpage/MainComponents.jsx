import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import RightArrow from '../../assets/images/Arrow-right.svg?react';
import LogoImg from '../../assets/images/logo.svg?react';
import MainImg from '../../assets/images/main_bg.svg?react';
import UserIcon from '../../assets/images/user_icon.svg?react';
import { postSubjectsId } from '../../api/postSubjectsId';
import Button from '../AnswerList/Button';

// 로고 Float 애니메이션
const logoFloat = {
  y: [-8, 8, -8],
  transition: {
    duration: 4,
    repeat: Infinity,
    ease: 'easeInOut',
  },
};

// 질문하러 가기 버튼 컴포넌트화 클래스
const MainButton = 'md:px-6 md:py-3 md:text-base text-bn-40';
const MainMobileButton = 'md:hidden mb-6';

const MainComponents = () => {
  const [name, setName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const navigate = useNavigate();

  // 질문 받기 버튼 클릭 핸들러
  const handleSubmit = async () => {
    const trimmedName = name.trim();

    if (!trimmedName) {
      alert('이름을 입력해주세요.');
      return;
    }

    setIsLoading(true);

    try {
      await postSubjectsId({ name: trimmedName });
      setShowSuccess(true);

      // 성공 애니메이션 후 페이지 이동
      setTimeout(() => {
        navigate('/list');
      }, 1500);
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
    // 전체 페이지 fade-in 애니메이션
    <motion.main
      className="min-h-screen bg-gs-20 flex flex-col"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-6">
        {/* 데스크톱 질문하러 가기 버튼 */}
        <div className="hidden md:block self-end mb-auto pr-8 md:pr-12 lg:pr-16 mt-6 md:mt-8">
          <Link to="/list">
            <Button className={MainButton}>질문하러 가기</Button>
          </Link>
        </div>

        <div className="flex flex-col items-center mt-auto mb-auto">
          {/* 로고 애니메이션 */}
          <motion.header animate={logoFloat}>
            <LogoImg
              className="w-[456px] mb-6 md:mb-7 lg:mb-8 h-[100px] md:h-auto"
              aria-label="메인 로고"
            />
          </motion.header>

          {/* 모바일 질문하러 가기 버튼 */}
          <Link to="/list">
            <Button className={MainMobileButton}>질문하러 가기</Button>
          </Link>

          {/* 입력 폼 */}
          <form
            className="bg-gs-10 w-full max-w-[350px] md:max-w-[380px] lg:max-w-[400px] py-6 px-6 md:py-7 md:px-7 lg:py-8 lg:px-8 rounded-xl"
            onSubmit={e => {
              e.preventDefault();
              handleSubmit();
            }}
          >
            <div className="flex flex-col items-center gap-3 md:gap-3.5 lg:gap-4">
              {/* 입력창 + 아이콘 */}
              <motion.div
                className="relative w-full"
                whileHover={{ scale: 1.01 }}
                animate={
                  name.length > 0 && {
                    scale: 1.02,
                    boxShadow: '0 0 20px rgba(84, 47, 26, 0.2)',
                  }
                }
                transition={{ duration: 0.2 }}
              >
                <UserIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 md:w-4.5 md:h-4.5 lg:w-5 lg:h-5" />
                <input
                  type="text"
                  id="user-name"
                  placeholder="이름을 입력하세요"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  onKeyDown={handleKeyPress}
                  disabled={isLoading}
                  className="pl-10 pr-4 py-2.5 md:py-2.5 lg:py-3 border border-gs-40 rounded-lg w-full text-sm md:text-sm lg:text-base disabled:opacity-50 focus:outline-none focus:border-bn-40 transition-colors"
                  aria-label="사용자 이름 입력"
                  required
                />
              </motion.div>

              {/* 버튼 / 성공 메시지 */}
              <AnimatePresence mode="wait">
                {!showSuccess ? (
                  <motion.button
                    key="submit-button"
                    onClick={handleSubmit}
                    disabled={isLoading || !name.trim()}
                    className="px-4 py-2.5 md:px-5 md:py-2.5 lg:px-6 lg:py-3 bg-bn-40 text-gs-10 rounded-lg w-full hover:bg-amber-800 text-sm md:text-sm lg:text-base disabled:opacity-50 disabled:cursor-not-allowed"
                    whileHover={
                      !isLoading &&
                      name.trim() && {
                        scale: 1.05,
                        boxShadow: '0 8px 25px rgba(84, 47, 26, 0.3)',
                      }
                    }
                    whileTap={!isLoading && name.trim() && { scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    exit={{ opacity: 0, scale: 0.8, y: 20 }}
                  >
                    {isLoading ? (
                      <motion.div
                        className="flex items-center justify-center gap-2"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                      >
                        <motion.div
                          className="w-4 h-4 border-2 border-white border-t-transparent rounded-full"
                          animate={{ rotate: 360 }}
                          transition={{
                            duration: 1,
                            repeat: Infinity,
                            ease: 'linear',
                          }}
                        />
                        처리 중...
                      </motion.div>
                    ) : (
                      '질문 받기'
                    )}
                  </motion.button>
                ) : (
                  <motion.div
                    key="success-message"
                    className="px-4 py-2.5 md:px-5 md:py-2.5 lg:px-6 lg:py-3 bg-bn-40 text-white rounded-lg w-full text-sm md:text-sm lg:text-base text-center font-medium focus:outline-none border-none"
                    initial={{ opacity: 0, scale: 0.8, y: 20 }}
                    animate={{
                      opacity: 1,
                      scale: 1,
                      y: 0,
                      boxShadow: '0 4px 20px rgba(34, 197, 94, 0.3)',
                    }}
                    transition={{
                      duration: 0.6,
                      boxShadow: { duration: 1.5, times: [0, 0.5, 1] },
                    }}
                  >
                    <motion.div
                      className="flex items-center justify-center gap-2"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.3 }}
                    >
                      <motion.span
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{
                          delay: 0.5,
                          type: 'spring',
                          stiffness: 500,
                        }}
                      >
                        ✓
                      </motion.span>
                      성공적으로 생성되었습니다!
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </form>
        </div>
      </div>

      {/* 하단 배경 이미지 */}
      <motion.figure
        className="w-full"
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        aria-hidden="true"
      >
        <MainImg className="w-full h-auto block" />
      </motion.figure>
    </motion.main>
  );
};

export default MainComponents;
