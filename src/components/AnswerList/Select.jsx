import { memo, useEffect, useRef, useState } from 'react';
import SelectIcon from '../../assets/images/Arrow-down.svg?react';

function Select({ handleNew, handleName }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectValue, setSelectValue] = useState('최신순');
  const sortOptions = ['이름순', '최신순'];
  const selectRef = useRef(null);

  const baseClass = `${'py-2 px-3 text-[14px] text-left cursor-pointer w-[100%]'}`;
  const activeClass = `${'text-b50'}`;
  const changeIcon = `${'rotate-[-180deg]'}`;
  const baseIcon = `${`size-[14px] transition duration-300`}`;
  const selectOpen = () => {
    setIsOpen(prev => !prev);
  };

  const handleSelect = value => {
    setSelectValue(value);
    setIsOpen(false);
    if (value === '이름순') {
      handleName();
    } else if (value === '최신순') {
      handleNew();
    }
  };

  useEffect(() => {
    const handleClickOutSide = e => {
      if (selectRef.current && !selectRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutSide);
    return () => {
      document.addEventListener('mousedown', handleClickOutSide);
    };
  }, []);

  return (
    <div
      ref={selectRef}
      className="w-[79px]  text-center mx-0 my-0 relative md:mx-auto"
    >
      <button
        onClick={selectOpen}
        className="w-full flex items-center justify-between py-2 px-2 border border-gs-60 rounded-lg cursor-pointer bg-gs-10"
      >
        <div className="text-[14px]">{selectValue}</div>
        <SelectIcon aria-label="SelectIcon"
          className={`${isOpen === true ? changeIcon : ''} ${baseIcon}`}
        />
      </button>
      {isOpen && (
        <div className="border rounded-lg mt-1 absolute w-[79px] shadow-[#8C8C8C] shadow-lg z-10 cursor-pointer bg-gs-10">
          {sortOptions.map(item => {
            return (
              <button
                key={item}
                value={item}
                onClick={() => handleSelect(item)}
                className={`${baseClass} ${selectValue === item ? activeClass : ''}`}
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

export default memo(Select, (prev, next) => {
  if (prev.handleNew !== next.handleNew) return false;
  if (prev.handleName !== next.handleName) return false;

  return true;
});
