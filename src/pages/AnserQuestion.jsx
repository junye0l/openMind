import QuestionFeedList from '../components/question/QuestionFeedList';
import Headers from '../components/question/Headers';
import FloatingButton from '../components/question/FloatingButton';

function AnswerQuestion() {
  return (
    <div className=" bg-gs-20 flex flex-col items-center">
      <Headers />
      <QuestionFeedList />
      <FloatingButton />
    </div>
  );
}

export default AnswerQuestion;
