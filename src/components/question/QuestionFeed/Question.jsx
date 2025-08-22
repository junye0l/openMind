import getPreviouslyTime from '../../../util/getPreviouslyTime';

function Question({ content, createdAt }) {
  return (
    <div className="flex flex-col gap-[4px] ">
      <p className="text-[14px] font-medium text-gs-40">
        질문 · {getPreviouslyTime(createdAt)}
      </p>
      <p className="text-[18px] max-sm:text-[16px] font-normal">{content}</p>
    </div>
  );
}

export default Question;
