import MessageIcon from '../../assets/images/Messages.svg';
import CardImg from '../../assets/images/profile_img.svg';

export default function Card() {
  return (
    <div className="border border-[#818181] rounded-2xl w-[220px] h-[187px] px-[20px] py-[20px]">
      <div>
        <img className='size-[60px] pb-3' src={CardImg} alt="질문카드프로필" />
      </div>
      <div>
        <h2 className='text-[20px] whitespace-nowrap text-ellipsis overflow-hidden pb-7'>
          아초는고양이
        </h2>
      </div>
      <div className='flex items-center justify-between'>
        <div className='flex items-center'>
          <img className='size-[18px]' src={MessageIcon} alt="메세지아이콘" />
          <p className='text-[#818181]'>받은 질문</p>
        </div>
        <div>
          <p className='text-[#818181]'>9개</p>
        </div>
      </div>
    </div>
  );
}
