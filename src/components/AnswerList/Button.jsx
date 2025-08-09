import btnIcon from '../../assets/images/Arrow-right.svg';
export default function Button({ children }) {
  return (
    <button className="flex justify-between items-center w-[161px] px-4 py-2 text-[#542F1A] bg-[#F5F1EE] rounded-[8px] border-[#542F1A] border text-[16px]">
      {children}
      <img className='size-[18px] fill-[#542F1A]' src={btnIcon} alt='버튼화살표아이콘'/>
    </button>
  );
}
