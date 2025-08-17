import Question from './Question';
import StatusBadge from './StatusBadge';
import AnswerContent from './AnswerContent';
import LikeButton from './LikeButton';

function QuestionCard() {
  return (
    <div className=" bg-gs-10 rounded-[16px] p-[32px] flex flex-col items-start gap-[32px]">
      <StatusBadge />
      <Question />
      <AnswerContent />
      <LikeButton />
    </div>
  );
}

export default QuestionCard;
