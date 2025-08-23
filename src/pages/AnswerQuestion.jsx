import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import QuestionFeedList from '../components/question/QuestionFeedList';
import Headers from '../components/question/Headers';
import FloatingButton from '../components/question/FloatingButton';
import QuestionModal from '../components/Modal/QuestionModal';
import useUserInfo from '../hook/useInfo';
import useInfiniteScroll from '../hook/useInfiniteScroll';
import { useCallback, useRef } from 'react';

function AnswerQuestion() {
  const { userInfo, loading, error } = useUserInfo();
  const { questionList, moreNext, isLoading, loadMoreQuestions } =
    useInfiniteScroll(userInfo?.id);

  const [showToast, setShowToast] = useState(false);

  // 페이지가 새로고침되어 마운트될 때 토스트 플래그 확인
  useEffect(() => {
    const KEY = 'toast:newQuestion';
    if (sessionStorage.getItem(KEY) === '1') {
      sessionStorage.removeItem(KEY);
      setShowToast(true);
      const t = setTimeout(() => setShowToast(false), 1200);
      return () => clearTimeout(t);
    }
  }, []); // ← 마운트 한 번만 실행

  const observerRef = useRef();

  const observer = useCallback(
    node => {
      if (isLoading) return;
      if (observerRef.current) observerRef.current.disconnect();

      observerRef.current = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting && moreNext) {
            loadMoreQuestions();
          }
        },
        { threshold: 0.1 }
      );

      if (node) observerRef.current.observe(node);
    },
    [isLoading, moreNext, loadMoreQuestions]
  );
  if (error) return <p>에러: {error}</p>;

  return (
    <div className="w-full bg-gs-20 flex flex-col items-center">
      <Headers userInfo={userInfo} loading={loading} />
      <div className="w-full flex justify-center max-md:px-[32px] max-sm:px-[24px]">
        <QuestionFeedList
          userInfo={userInfo}
          questions={questionList}
          loading={isLoading}
        />
      </div>
      <div ref={observer} />
      <FloatingButton />
      <QuestionModal />

      {/* 페이지 레벨 토스트 */}
      <AnimatePresence>
        {showToast && (
          <div className="fixed inset-x-0 bottom-6 flex justify-center z-[60] pointer-events-none">
            <motion.div
              key="toast"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.25 }}
              className="rounded-lg px-4 py-3 bg-bn-40 text-white shadow-lg pointer-events-auto"
              role="status"
              aria-live="polite"
            >
              질문이 생성되었습니다!
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default AnswerQuestion;
