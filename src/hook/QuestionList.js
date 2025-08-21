import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getQuestion } from '../api/getQuestion';

function QuestionList() {
  const { id } = useParams();

  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchQuestion = async () => {
    try {
      setLoading(true);
      setError(null);
      // console.log('API 호출 시작');
      const data = await getQuestion(id);
      console.log(data);
      console.log(data.results);
      setQuestions(data.results || []);
      // console.log('API 호출 성공, 데이터: ', questions);
    } catch (err) {
      // console.error('실패', err);
      setError(err.message);
      setQuestions(null);
    } finally {
      setLoading(false);
      // console.log('호출 완료');
    }
  };

  useEffect(() => {
    if (id) {
      fetchQuestion();
    }
  }, [id]);

  return { questions, loading, error };
}

export default QuestionList;
