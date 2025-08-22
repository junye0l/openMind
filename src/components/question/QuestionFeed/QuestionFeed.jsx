import QuestionCounter from './QuestionCounter';
import QuestionCard from './QuestionCard';
import EmptyPost from '../../../assets/images/empty_post.svg?react';

function QuestionFeed({ userInfo, questions }) {
  const hasQuestions = questions.length > 0;

  return (
    <section className="max-w-[684px]rounded-[16px] p-[16px] flex flex-col items-center break-anywhere">
      {/* break-anywhere로 특수문자로 인한 텍스트 창 꺠짐 방지 */}
      <QuestionCounter userInfo={userInfo} />
      {hasQuestions ? (
        questions.map(question => (
          <QuestionCard
            key={question.id}
            question={question}
            userInfo={userInfo}
          />
        ))
      ) : (
        <EmptyPost className="my-[70px]" />
      )}
    </section>
  );
}

export default QuestionFeed;
