import { useState, useEffect } from 'react';
import { postReaction } from '../../../api/postReaction';
import ThumbsUp from '../../../assets/images/thumbs-up.svg?react';
import ThumbsDown from '../../../assets/images/thumbs-down.svg?react';

const LIKE = 'like';
const NONE = '';
const DISLIKE = 'dislike';

function LikeButton({ question }) {
  const [likeCount, setLikeCount] = useState(question.like);
  const [dislikeCount, setDislikeCount] = useState(question.dislike);
  const [reactionType, setReactionType] = useState(NONE);
  const [isLoading, setIsLoading] = useState(false);

  const isLikeActive = reactionType === LIKE;
  const isDislikeActive = reactionType === DISLIKE;

  // 새로고침해도 상태 기억
  useEffect(() => {
    const saved = localStorage.getItem(`reaction_${question.id}`);
    if (saved && [LIKE, DISLIKE, NONE].includes(saved)) {
      setReactionType(saved);
    }
  }, []);

  // 상태 변경 시 저장
  useEffect(() => {
    localStorage.setItem(`reaction_${question.id}`, reactionType);
  }, [reactionType, question.id]);

  const handlelikeClick = async () => {
    if (isLoading || isLikeActive) return;

    try {
      setIsLoading(true);
      const response = await postReaction(question.id, { type: LIKE });

      setLikeCount(response.like);
      setDislikeCount(response.dislike);

      if (isDislikeActive) {
        // 싫어요 -> 좋아요
        setReactionType(LIKE);
      } else {
        // 좋아요 활성화
        setReactionType(LIKE);
      }
    } catch (error) {
      console.log(`좋아요 실패: `, error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDislikeClick = async () => {
    if (isLoading || isDislikeActive) return;

    try {
      setIsLoading(true);
      const response = await postReaction(question.id, { type: DISLIKE });

      setLikeCount(response.like);
      setDislikeCount(response.dislike);

      if (isLikeActive) {
        // 좋아요 -> 싫어요
        setReactionType(DISLIKE);
      } else {
        // 싫어요 활성화
        setReactionType(DISLIKE);
      }
    } catch (error) {
      console.log('싫어요 실패: ', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className=" border-t-gs-30 border-t-[1px] w-full pt-[24px] flex gap-[32px] text-[14px] font-medium">
      <button
        onClick={handlelikeClick}
        className={`flex items-center text-[14px] font-medium gap-[6px] ${isLikeActive ? 'text-b50' : 'text-gs-40'}`}
      >
        <ThumbsUp
          className={` w-[16px] h-[16px] ${isLikeActive ? 'fill-b50' : 'fill-gs-40'}`}
        />
        <p>좋아요</p>
        <p>{likeCount}</p>
      </button>
      <button
        onClick={handleDislikeClick}
        className={`flex items-center text-[14px] font-medium gap-[6px] ${isDislikeActive ? 'text-gs-60' : 'text-gs-40'}`}
      >
        <ThumbsDown
          className={` w-[16px] h-[16px] ${isDislikeActive ? 'fill-gs-60' : 'fill-gs-40'}`}
        />
        <p>싫어요</p>
        <p>{dislikeCount}</p>
      </button>
    </div>
  );
}

export default LikeButton;
