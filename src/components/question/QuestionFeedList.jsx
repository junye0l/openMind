import Messages from '../../assets/images/messages.svg?react';
import AnswerNo from '../../assets/images/answer_no.svg?react';

function QuestionFeedList() {
  return (
    <main className="border-bn-30 rounded-[16px] w-[716px] mt-[189px] bg-bn-10 border border-solid flex flex-col justify-center items-center">
      <div className="flex items-center gap-[8px] m-[16px]">
        <Messages className="fill-bn-40" />
        <h2 className="text-[20px] font-[400]">*개의 질문이 있습니다.</h2>
      </div>
      <section className="w-[684px] m-[20px] mt-[0] bg-gs-10 rounded-[16px]">
        <div>
          <AnswerNo />
        </div>
        <div>
          <p>질문-1day</p>
          <p>질문 내용</p>
        </div>
        <div>
          <p>프로필</p>
          <p>닉네임-작성날짜</p>
          <p>답변 내용</p>
        </div>
        <div>--------------------</div>
        <div>
          <p>좋아요</p> <p>싫어요</p>
        </div>
      </section>
    </main>
  );
}

export default QuestionFeedList;
