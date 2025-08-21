// import { useState, useEffect } from 'react';
// import { useParams } from 'react-router-dom';
// import { getQuestion } from '../api/getQuestion';

// function QuestionCard() {
//   const { id } = useParams();

//   const [isQuestions, setIsQuestions] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   const fetchQuestion = async () => {
//     try {
//       setLoading(true);
//       setError(null);
//       console.log('API 호출 시작');
//       const data = await getQuestion(id);
//       console.log(data);
//       console.log(data.results);
//       setIsQuestions(data.results || []);
//       console.log('API 호출 성공, 데이터: ', isQuestions);
//     } catch (err) {
//       console.error('실패', err);
//       setError(err.message);
//       setIsQuestions(null);
//     } finally {
//       setLoading(false);
//       console.log('호출 완료');
//     }
//   };

//   useEffect(() => {
//     if (id) {
//       fetchQuestion();
//     }
//   }, [id]);

//   return { isQuestions, loading, error };
// }

// export default QuestionCard;
