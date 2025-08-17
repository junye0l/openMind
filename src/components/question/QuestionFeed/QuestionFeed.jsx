import QuestionCounter from './QuestionCounter';
import QuestionCard from './QuestionCard';

function QuestionFeed({ userInfo }) {
  return (
    <section className="max-w-[684px]rounded-[16px] p-[16px]">
      <QuestionCounter userInfo={userInfo} />
      {}
      <QuestionCard />
    </section>
  );
}

export default QuestionFeed;
