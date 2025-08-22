import { useCallback, useEffect, useState } from 'react';
import { getQuestionList } from '../api/getQuestion';

function useInfiniteScroll(subjectId) {
  const [questionList, setQuestionList] = useState([]);
  const [moreNext, setMoreNext] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const loadMoreQuestions = useCallback(async () => {
    if (isLoading || !moreNext || !subjectId) return;
    setIsLoading(true);
    try {
      const currentOffset = questionList.length;
      const response = await getQuestionList(subjectId, 8, currentOffset);
      setQuestionList(prevList => {
        const existingIds = prevList.map(q => q.id);
        const newItems = response.results.filter(
          item => !existingIds.includes(item.id)
        );
        return [...prevList, ...newItems];
      });

      setMoreNext(response.next !== null);
      setIsLoading(false);
    } catch (e) {
      console.error(`오류입니다. ${e.message}`);
      setIsLoading(false);
    }
  }, [subjectId, questionList.length, isLoading, moreNext]);

  useEffect(() => {
    if (subjectId && questionList.length === 0) {
      loadMoreQuestions();
    }
  }, [subjectId]);

  return { questionList, moreNext, isLoading, subjectId, loadMoreQuestions };
}

export default useInfiniteScroll;
