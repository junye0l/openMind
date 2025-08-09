import { useState } from 'react';
import selectIcon from '../../assets/images/Arrow-down.svg';

export default function Select() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectValue, setSelectValue] = useState('이름순');
  const options = ['이름순', '최신순'];

  const baseClass = `${'py-2 px-3 text-[14px] text-left cursor-pointe w-[100%]'}`;
  const activeClass = `${'text-[#1877F2]'}`;
  const selectOpen = () => {
    setIsOpen(prev => !prev);
  };

  const handleSelect = value => {
    setSelectValue(value);
    setIsOpen(false);
  };

  return (
    <div className="w-[79px]  text-center mx-auto my-0 relative">
      <button
        onClick={selectOpen}
        className="flex items-center justify-between py-2 px-2 border border-[#000000] rounded-lg cursor-pointer"
      >
        <div className="text-[14px]">{selectValue}</div>
        <img className="size-[14px]" src={selectIcon} alt="드랍다운아이콘" />
      </button>
      {isOpen && (
        <div className="border rounded-lg mt-1 absolute w-[79px] shadow-[#8C8C8C40] shadow-lg z-10 cursor-pointe">
          {options.map(item => {
            return (
              <button
                value={item}
                onClick={() => handleSelect(item)}
                className={`${baseClass} ${selectValue === item ? activeClass : ""}`}
              >
                {item}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
