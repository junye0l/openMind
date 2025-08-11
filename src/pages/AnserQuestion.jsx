// import { useState } from 'react';
import QuestionFeedList from '../components/question/QuestionFeedList';
import Headers from '../components/question/Headers';
import FloatingButton from '../components/question/FloatingButton';

function AnswerQuestion() {
  return (
    <div className="relative flex flex-col items-center">
      <Headers />
      <main className="flex flex-col justify-center items-center rounded-[16px] w-[716px] mt-[189px] bg-[#C7bbb5]">
        <QuestionFeedList />
      </main>
      <FloatingButton />
    </div>
  );
}

export default AnswerQuestion;
