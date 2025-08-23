import getPreviouslyTime from '../../../util/getPreviouslyTime';

function AnswerContent({ userInfo, isAnswer, createdAt }) {
  return (
    <div className="flex gap-[12px]">
      <img
        src={userInfo.imageSource}
        alt="답변자 프로필 이미지"
        aria-label="답변자 프로필 이미지"
        className="w-[48px] h-[48px] max-sm:w-[32px] max-sm:h-[32px] rounded-full"
      />
      <div className="flex flex-col flex-1 gap-[4px]">
        <div className="flex items-center gap-[12px] ">
          <p className="text-[18px] font-normal">{userInfo.name}</p>
          <p className="text-[14px] font-medium text-gs-40">
            {getPreviouslyTime(createdAt)}
          </p>
        </div>
        <p className="text-[16px] font-normal">{isAnswer.content}</p>
      </div>
    </div>
  );
}

export default AnswerContent;
