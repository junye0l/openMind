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

  if (loading) return <p>사용자 정보를 불러오는 중...</p>;
  if (error) return <p>에러: {error}</p>;

  return (
    <div className="w-full bg-gs-20 flex flex-col items-center">
      <Headers userInfo={userInfo} />
      <QuestionFeedList userInfo={userInfo} questions={questionList} />
      <div ref={observer} />
      <FloatingButton />
      <QuestionModal />
    </div>
  );
}

export default AnswerQuestion;
