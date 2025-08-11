import React from 'react';

function QuestionFeedList() {
  const questions = ['임시 질문1', '임시 질문2', '임시 질문3'];

  return (
    <>
      <h1 className="m-[16px]">*개의 질문이 있습니다.</h1>
      <section>
        {questions.map((question, index) => (
          <div
            key={index}
            className="w-[684px] m-[20px] mt-[0] bg-[#ffffff] rounded-[16px]"
          >
            {question}
          </div>
        ))}
      </section>
    </>
  );
}

export default QuestionFeedList;
