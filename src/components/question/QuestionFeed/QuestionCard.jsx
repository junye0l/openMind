import Question from './Question';
import StatusBadge from './StatusBadge';
import AnswerContent from './AnswerContent';
import LikeButton from './LikeButton';

function QuestionCard({ question }) {
  return (
    <div className=" bg-gs-10 w-[684px] rounded-[16px] p-[32px] mt-[20px] flex flex-col items-start gap-[32px]">
      <StatusBadge />
      <Question content={question.content} createdAt={question.createdAt} />
      {question.answer && <AnswerContent answer={question.answer} />}
      <LikeButton />
    </div>
  );
}

export default QuestionCard;
