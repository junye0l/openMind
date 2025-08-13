import QuestionCounter from './QuestionCounter';
import QuestionCard from './QuestionCard';

function QuestionFeed() {
  return (
    <section className="max-w-[684px]rounded-[16px] p-[16px]">
      <QuestionCounter />
      <QuestionCard />
    </section>
  );
}

export default QuestionFeed;
