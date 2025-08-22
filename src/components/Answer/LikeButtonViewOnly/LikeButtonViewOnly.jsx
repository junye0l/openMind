import { useEffect, useState } from 'react';
import ThumbsUp from '../../../assets/images/thumbs-up.svg?react';
import ThumbsDown from '../../../assets/images/thumbs-down.svg?react';

const LIKE = 'like';
const DISLIKE = 'dislike';
const NONE = '';

export default function LikeButtonViewOnly({
  questionId,
  like = 0,
  dislike = 0,
  className = '',
}) {
  const [reactionType, setReactionType] = useState(NONE);

  useEffect(() => {
    if (!questionId) return;
    const saved = localStorage.getItem(`reaction_${questionId}`);
    if (saved && [LIKE, DISLIKE, NONE].includes(saved)) {
      setReactionType(saved);
    } else {
      setReactionType(NONE);
    }
  }, [questionId]);

  const isLikeActive = reactionType === LIKE;
  const isDislikeActive = reactionType === DISLIKE;

  return (
    <div
      className={
        `border-t-gs-30 border-t-[1px] w-full pt-[24px] flex gap-[32px] text-[14px] font-medium mt-12 ` +
        className
      }
      aria-label="반응 보기"
    >
      <div
        className={`flex items-center gap-[6px] select-none ${
          isLikeActive ? 'text-b50' : 'text-gs-40'
        }`}
      >
        <ThumbsUp
          className={`w-[16px] h-[16px] ${
            isLikeActive ? 'fill-b50' : 'fill-gs-40'
          }`}
        />
        <p>좋아요</p>
        <p>{like}</p>
      </div>

      <div
        className={`flex items-center gap-[6px] select-none ${
          isDislikeActive ? 'text-b50' : 'text-gs-40'
        }`}
      >
        <ThumbsDown
          className={`w-[16px] h-[16px] ${
            isDislikeActive ? 'fill-b50' : 'fill-gs-40'
          }`}
        />
        <p>싫어요</p>
        <p>{dislike}</p>
      </div>
    </div>
  );
}
