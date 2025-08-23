import QuestionFeed from './QuestionFeed/QuestionFeed';

function QuestionFeedList({ userInfo, questions, loading }) {
  return (
    <main className="border-bn-30 rounded-[16px] max-w-[716px] w-full mt-[189px] mb-[136px] bg-bn-10 border border-solid flex flex-col justify-center items-center">
      <QuestionFeed
        userInfo={userInfo}
        questions={questions}
        loading={loading}
      />
    </main>
  );
}

export default QuestionFeedList;
