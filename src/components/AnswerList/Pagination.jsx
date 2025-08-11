import leftArrow from '../../assets/images/Arrow-left.svg';

export default function Pagination({page, setPage }) {
  const BaseBtn = `text-[20px] text-[#818181] px-4 py-2`;
  const atciveBtn = `text-[#542F1A]`;

  const handleClick = e => {
    setPage(e.target.value);
    console.log(e.target.value);
  };

  return (
    <div className="flex items-center pt-10 justify-center">
      <button
        className="size-5"
        onClick={() => setPage(prev => Math.max(prev - 1, 1))}
      >
        <img src={leftArrow} alt="왼쪽화살표" />
      </button>
      <button value={1} onClick={handleClick} className={`${BaseBtn} ${page === 1 ? atciveBtn : ''}`}>
        1
      </button>
      <button value={2} onClick={handleClick} className={BaseBtn}>
        2
      </button>
      <button className={BaseBtn}>3</button>
      <button className={BaseBtn}>4</button>
      <button className={BaseBtn}>5</button>
      <button
        className="size-5"
        onClick={() => setPage(prev => Math.max(prev + 1, 1))}
      >
        <img
          className="translate rotate-[180deg]"
          src={leftArrow}
          alt="오른쪽화살표"
        />
      </button>
    </div>
  );
}
