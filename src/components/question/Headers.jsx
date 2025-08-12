import mainBg from '../../assets/images/main_bg.svg';
import ProfileSection from './ProfileSection';

function Headers() {
  return (
    <header className="relative w-full h-full flex flex-col items-center">
      <div className="w-full bg-[#ffffff]">
        <img
          className="max-w-[1200px] h-[234px] mx-auto"
          src={mainBg}
          alt="배경화면"
        />
      </div>
      <ProfileSection />
    </header>
  );
}

export default Headers;
