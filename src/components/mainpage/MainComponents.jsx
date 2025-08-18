import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import RightArrow from '../../assets/images/Arrow-right.svg';
import logoImg from '../../assets/images/logo.svg';
import MainImg from '../../assets/images/main_bg.svg';
import UserIcon from '../../assets/images/user_icon.svg';
import { postSubjectsId } from '../../api/postSubjectsId';

const MainComponents = () => {
  const [name, setName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const navigate = useNavigate();

  // 로고 Float 애니메이션
  const logoFloat = {
    y: [-8, 8, -8],
    transition: {
      duration: 4,
      repeat: Infinity,
      ease: 'easeInOut',
    },
  };

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
    <motion.div
      className="min-h-screen bg-gs-20 flex flex-col"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-6">
        {/* 데스크톱 질문하러 가기 버튼 */}
        <div className="hidden md:block self-end mb-auto pr-8 md:pr-12 lg:pr-16 mt-6 md:mt-8">
          <motion.button
            onClick={() => navigate('/list')}
            className="flex items-center gap-2 px-4 py-2 md:px-6 md:py-3 bg-bn-10 border border-bn-40 rounded-lg hover:bg-gray-100 text-sm md:text-base text-bn-40"
            whileHover={{
              scale: 1.05,
              boxShadow: '0 4px 15px rgba(84, 47, 26, 0.2)',
            }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
            질문하러 가기{' '}
            <img
              src={RightArrow}
              alt="오른쪽 화살표"
              className="w-3 h-3 md:w-4 md:h-4"
            />
          </motion.button>
        </div>

        <div className="flex flex-col items-center mt-auto mb-auto">
          {/* 로고 애니메이션 */}
          <motion.img
            src={logoImg}
            alt="메인로고"
            className="w-[456px] mb-6 md:mb-7 lg:mb-8 h-[100px] md:h-auto"
            animate={logoFloat}
          />

          {/* 모바일 질문하러 가기 버튼 */}
          <motion.button
            onClick={() => navigate('/list')}
            className="md:hidden flex items-center gap-2 px-4 py-2 mb-6 bg-bn-10 border border-bn-40 rounded-lg hover:bg-gray-100 text-sm text-bn-40"
            whileHover={{
              scale: 1.05,
              boxShadow: '0 4px 15px rgba(84, 47, 26, 0.2)',
            }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
            질문하러 가기{' '}
            <img src={RightArrow} alt="오른쪽 화살표" className="w-3 h-3" />
          </motion.button>

          {/* 입력 폼 */}
          <div className="bg-gs-10 w-full max-w-[350px] md:max-w-[380px] lg:max-w-[400px] py-6 px-6 md:py-7 md:px-7 lg:py-8 lg:px-8 rounded-xl">
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
                  className="pl-10 pr-4 py-2.5 md:py-2.5 lg:py-3 border border-gs-40 rounded-lg w-full text-sm md:text-sm lg:text-base disabled:opacity-50 focus:outline-none focus:border-bn-40 transition-colors"
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
          </div>
        </div>
      </div>

      {/* 하단 배경 이미지 */}
      <motion.img
        src={MainImg}
        alt="메인 배경"
        className="w-full h-auto block"
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.3 }}
      />
    </motion.div>
  );
};

export default MainComponents;
