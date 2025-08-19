import MainBg from '../../assets/images/main_bg.png';
import ProfileSection from './ProfileSection';

function Headers({ userInfo }) {
  return (
    <header className=" w-full h-full bg-gs-10 flex flex-col items-center">
      <img src={MainBg} className="max-w-[1200px] h-[234px]" />
      <ProfileSection userInfo={userInfo} />
    </header>
  );
}

export default Headers;
