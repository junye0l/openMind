import FacebookImg from '../../../assets/images/Facebook.svg?react';

function FacebookShareButton() {
  const shareClick = () => {
    const shareUrl = window.location.href;
    const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`;
    window.open(facebookUrl);
  };
  return (
    <button
      className="p-[11px] bg-b50 flex justify-center items-center rounded-full"
      onClick={shareClick}
    >
      <FacebookImg className="fill-gs-10" aria-label="페이스북 공유하기 로고" />
    </button>
  );
}

export default FacebookShareButton;
