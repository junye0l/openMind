const getPreviouslyTime = createdAt => {
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

export default getPreviouslyTime;
