import QuestionFeedList from '../components/question/QuestionFeedList';
import Headers from '../components/question/Headers';
import FloatingButton from '../components/question/FloatingButton';
import useUserInfo from '../hook/useInfo';
import QuestionModal from '../components/Modal/QuestionModal';

function AnswerQuestion() {
  const { userInfo, loading, error } = useUserInfo();

  if (loading) return <p>사용자 정보를 불러오는 중...</p>;

  if (error) return <p>에러: {error}</p>;

  return (
    <div className=" bg-gs-20 flex flex-col items-center">
      <Headers userInfo={userInfo} />
      <QuestionFeedList userInfo={userInfo} />
      <FloatingButton />
      <QuestionModal />
    </div>
  );
}

export default AnswerQuestion;
