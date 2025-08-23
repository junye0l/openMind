import { useCallback, useEffect, useState } from 'react';
import { getQuestionList } from '../api/getQuestion';

function useInfiniteScroll(subjectId, pageSize = 8) {
  const [questionList, setQuestionList] = useState([]);
  const [moreNext, setMoreNext] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [totalCount, setTotalCount] = useState(null); // 총 개수 저장하기

  const loadMoreQuestions = useCallback(async () => {
    if (isLoading || !moreNext || !subjectId) return;
    setIsLoading(true);
    try {
      const currentOffset = questionList.length;
      const response = await getQuestionList(
        subjectId,
        pageSize,
        currentOffset
      );

      setQuestionList(prevList => {
        const existing = new Set(prevList.map(q => q.id));
        const add = (response.results || []).filter(
          item => !existing.has(item.id)
        );
        return [...prevList, ...add];
      });

      // API에서 count 총 개수 저장
      if (typeof response?.count === 'number') {
        setTotalCount(response.count);
      }

      setMoreNext(response?.next !== null && response?.next !== undefined);
    } catch (e) {
      console.error(`오류입니다. ${e?.message || e}`);
    } finally {
      setIsLoading(false);
    }
  }, [subjectId, pageSize, questionList.length, isLoading, moreNext]);

  useEffect(() => {
    if (subjectId && questionList.length === 0) {
      loadMoreQuestions();
    }
  }, [subjectId]);

  return {
    questionList,
    moreNext,
    isLoading,
    loadMoreQuestions,
    setQuestionList,
    totalCount,
  };
}

export default useInfiniteScroll;
