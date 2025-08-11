import mainBg from '../../assets/images/main_bg.svg';
import ProfileSection from './ProfileSection';

function headers() {
  return (
    <header className="w-full h-full flex flex-col items-center">
      <img className="w-full h-[234px]" src={mainBg} alt="배경화면" />
      <ProfileSection />
    </header>
  );
}

export default headers;
