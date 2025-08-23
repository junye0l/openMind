import Messages from '../../../assets/images/Messages.svg?react';

function QuestionCounter({ userInfo }) {
  return (
    <div className="flex items-center justify-center gap-[8px]">
      <Messages
        className="fill-bn-40 max-sm:w-[22px] max-sm:h-[22px]"
        aria-label="메시지 아이콘"
      />
      {userInfo?.questionCount === 0 ? (
        <h2 className="text-[20px] max-sm:text-[18px] font-[400] text-bn-40">
          아직 질문이 없습니다.
        </h2>
      ) : (
        <h2 className="text-[20px] max-sm:text-[18px] font-[400] text-bn-40">
          {userInfo?.questionCount}개의 질문이 있습니다.
        </h2>
      )}
    </div>
  );
}

export default QuestionCounter;
