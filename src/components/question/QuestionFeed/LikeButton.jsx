import ThumbsUp from '../../../assets/images/thumbs-up.svg?react';
import ThumbsDown from '../../../assets/images/thumbs-down.svg?react';

function LikeButton() {
  return (
    <div className=" border-t-gs-30 border-t-[1px] w-full pt-[24px] flex gap-[32px] text-[14px] font-medium text-gs-40">
      <button className="flex items-center gap-[6px]">
        <ThumbsUp className="fill-gs-40 w-[16px] h-[16px]" />
        <p>좋아요</p>
      </button>
      <button className="flex items-center gap-[6px]">
        <ThumbsDown className="fill-gs-40 w-[16px] h-[16px]" />
        <p>싫어요</p>
      </button>
    </div>
  );
}

export default LikeButton;
