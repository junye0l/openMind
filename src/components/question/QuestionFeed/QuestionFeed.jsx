import QuestionCounter from './QuestionCounter';
import QuestionCard from './QuestionCard';

function QuestionFeed({ userInfo, questions }) {
  return (
    <section className="max-w-[684px]rounded-[16px] p-[16px]">
      <QuestionCounter userInfo={userInfo} />
      {questions.map(question => (
        <QuestionCard key={question.id} question={question} />
      ))}
    </section>
  );
}

export default QuestionFeed;
