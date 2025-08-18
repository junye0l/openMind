function Question({ content, createdAt }) {
  const timeString = () => {
    const currentTime = new Date();
    const createTime = new Date(createdAt);

    const diff = currentTime - createTime;
    const diffInSeconds = Math.floor(diff / 1000);

    const times = [
      { name: '년', seconds: 60 * 60 * 24 * 365 },
      { name: '개월', seconds: 60 * 60 * 24 * 30 },
      { name: '일', seconds: 60 * 60 * 24 },
      { name: '시간', seconds: 60 * 60 },
      { name: '분', seconds: 60 },
    ];

    for (const value of times) {
      const betweenTime = Math.floor(diffInSeconds / value.seconds);
      if (betweenTime > 0) {
        return `${betweenTime}${value.name}전`;
      }
    }
    return '방금 전';
  };

  return (
    <div className="flex flex-col gap-[4px] ">
      <p className="text-[14px] font-medium text-gs-40">
        질문 · {timeString()}
      </p>
      <p className="text-[18px] font-normal">{content}</p>
    </div>
  );
}

export default Question;
