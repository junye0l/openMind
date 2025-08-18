import QuestionFeed from './QuestionFeed/QuestionFeed';
import QuestionList from '../../hook/useQuestionList';

function QuestionFeedList({ userInfo }) {
  const { questions, loading, error } = QuestionList();

  if (loading) return <div>로딩 중</div>;
  if (error) return <div>에러: {error}</div>;

  return (
    <main className="border-bn-30 rounded-[16px] w-[716px] mt-[189px] mb-[136px] bg-bn-10 border border-solid flex flex-col justify-center items-center">
      <QuestionFeed userInfo={userInfo} questions={questions} />
    </main>
  );
}

export default QuestionFeedList;
