import MainBg from '../../assets/images/main_bg.svg?react';
import ProfileSection from './ProfileSection';

function Headers() {
  return (
    <header className=" w-full h-full bg-gs-10 flex flex-col items-center">
      <MainBg className="max-w-[1200px] h-[234px] bg-gs-10" />
      <ProfileSection />
    </header>
  );
}

export default Headers;
