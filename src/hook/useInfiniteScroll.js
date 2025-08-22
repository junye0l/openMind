import { useCallback, useEffect, useState } from 'react';
import { getQuestionList } from '../api/getQuestion';

export default function useInfiniteScroll(subjectId, pageSize = 8) {
  const [questionList, setQuestionList] = useState([]);
  const [moreNext, setMoreNext] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const loadMoreQuestions = useCallback(async () => {
    if (isLoading || !moreNext || !subjectId) return;
    setIsLoading(true);
    try {
      const currentOffset = questionList.length;
      const res = await getQuestionList(subjectId, pageSize, currentOffset);

      setQuestionList(prev => {
        const exist = new Set(prev.map(q => q.id));
        const next = (res?.results ?? []).filter(it => !exist.has(it.id));
        return [...prev, ...next];
      });

      setMoreNext(Boolean(res?.next));
    } catch (e) {
      console.error(`오류입니다. ${e?.message || e}`);
    } finally {
      setIsLoading(false);
    }
  }, [subjectId, questionList.length, isLoading, moreNext, pageSize]);

  // subjectId 바뀌면 초기화
  useEffect(() => {
    setQuestionList([]);
    setMoreNext(true);
  }, [subjectId]);

  // 첫 페이지
  useEffect(() => {
    if (subjectId && questionList.length === 0) loadMoreQuestions();
  }, [subjectId, questionList.length, loadMoreQuestions]);

  return {
    questionList,
    moreNext,
    isLoading,
    loadMoreQuestions,
    setQuestionList,
  };
}
