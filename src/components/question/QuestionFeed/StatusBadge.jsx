function StatusBadge({ isAnswered }) {
  return (
    <>
      <span
        className={`px-[12px] py-[4px] text-[14px] font-medium border border-solid rounded-[8px] 
          ${isAnswered ? 'text-bn-40 border-bn-40' : 'text-gs-40 border-gs-40'}`}
      >
        {isAnswered ? '답변완료' : '미답변'}
      </span>
    </>
  );
}

export default StatusBadge;
