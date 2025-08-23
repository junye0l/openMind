import QuestionCounter from './QuestionCounter';
import QuestionCard from './QuestionCard';
import EmptyPost from '../../../assets/images/empty_post.svg?react';
import SkeletonCard from '../../SkeletonUi/SkeletonCard';

function QuestionFeed({ userInfo, questions, loading }) {
  const hasQuestions = questions.length > 0;

  return (
    <section className="max-w-[714px] max-md:max-w-[706px] w-full rounded-[16px] p-[16px] flex flex-col items-center break-anywhere">
      <QuestionCounter userInfo={userInfo} />
      {loading ? (
        [1, 2, 3].map(i => <SkeletonCard key={i} />)
      ) : hasQuestions ? (
        questions.map(question => (
          <QuestionCard
            key={question.id}
            question={question}
            userInfo={userInfo}
          />
        ))
      ) : (
        <EmptyPost className="my-[70px]" aria-label="빈 질문창 이미지" />
      )}
    </section>
  );
}

export default QuestionFeed;
