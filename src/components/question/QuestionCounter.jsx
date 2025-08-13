import Messages from '../../assets/images/messages.svg?react';

function QuestionCounter() {
  return (
    <div className="flex items-center justify-center gap-[8px] mb-[16px]">
      <Messages className="fill-bn-40" />
      <h2 className="text-[20px] font-[400] text-bn-40">
        *개의 질문이 있습니다.
      </h2>
    </div>
  );
}

export default QuestionCounter;
