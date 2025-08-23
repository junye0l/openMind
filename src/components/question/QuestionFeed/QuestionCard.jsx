import Question from './Question';
import StatusBadge from './StatusBadge';
import AnswerContent from './AnswerContent';
import LikeButton from './LikeButton';

function QuestionCard({ question, userInfo }) {
  return (
    <div className=" bg-gs-10 max-w-[684px] w-full rounded-[16px] p-[32px] max-sm:p-[24px] mt-[20px] flex flex-col items-start gap-[32px] max-sm:gap-[24px] shadow-[0_4px_4px_rgba(140, 140, 140, 0.25)]">
      <StatusBadge isAnswered={question.answer} />
      <Question content={question.content} createdAt={question.createdAt} />
      {question.answer && (
        <AnswerContent
          isAnswer={question.answer}
          userInfo={userInfo}
          createdAt={question.createdAt}
        />
      )}
      <LikeButton question={question} />
    </div>
  );
}

export default QuestionCard;
