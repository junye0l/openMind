import { useEffect } from 'react';
import KakaoImg from '../../../assets/images/Kakaotalk.svg?react';

function KakaoShareButton({ userInfo }) {
  useEffect(() => {
    if (window.Kakao && !window.Kakao.isInitialized()) {
      window.Kakao.init(import.meta.env.VITE_KEY_KAKAO_JAVASCRIPT);
    }
  }, []);
  const shareClick = () => {
    window.Kakao.Share.sendDefault({
      objectType: 'feed',
      content: {
        title: 'Open Mind',
        description: `${userInfo.name}님의 궁금한 것을 질문해보세요!`,
        imageUrl: 'https://i.imgur.com/FaZS4np.png',
        link: {
          webUrl: window.location.href,
          mobileWebUrl: window.location.href,
        },
      },
      buttons: [
        {
          title: '질문하러 가기',
          link: {
            mobileWebUrl: window.location.href,
            webUrl: window.location.href,
          },
        },
      ],
    });
  };

  return (
    <button
      className="p-[11px] bg-y50 flex justify-center items-center rounded-full"
      onClick={shareClick}
    >
      <KakaoImg className="fill-gs-60" />
    </button>
  );
}

export default KakaoShareButton;
