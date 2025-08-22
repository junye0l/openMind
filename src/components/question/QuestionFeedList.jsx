import QuestionFeed from './QuestionFeed/QuestionFeed';

function QuestionFeedList({ userInfo, questions }) {
  return (
    <main className="border-bn-30 rounded-[16px] w-[716px] mt-[189px] mb-[136px] bg-bn-10 border border-solid flex flex-col justify-center items-center">
      <QuestionFeed userInfo={userInfo} questions={questions} />
    </main>
  );
}

export default QuestionFeedList;
