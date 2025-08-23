import MainBg from '../../assets/images/main_bg.webp';
import ProfileSection from './ProfileSection';

function Headers({ userInfo, loading }) {
  return (
    <header className=" w-full h-[234px] max-sm:h-[177px] relative bg-gs-10 flex flex-col items-center">
      <img
        src={MainBg}
        alt="상단 이미지"
        className="max-w-[1200px] w-full h-full max-sm:h-[177px]"
      />
      <ProfileSection userInfo={userInfo} loading={loading} />
    </header>
  );
}

export default Headers;
