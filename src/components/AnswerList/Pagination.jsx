import { memo } from 'react';
import ArrowButton from '../../assets/images/Arrow-left.svg?react';

function Pagination({
  currentPages: currentPages,
  totalPages,
  setCurrentPages,
}) {
  const BaseBtn = `text-[20px] text-gs-40 px-4 py-2`;
  const activeBtn = `text-[20px] px-4 py-2 text-bn-40`;

  const groupIndex = Math.floor((currentPages - 1) / 5);
  const startPage = groupIndex * 5 + 1;
  const endPage = Math.min(startPage + 4, totalPages);

  const pages = Array.from(
    { length: endPage - startPage + 1 },
    (item, i) => startPage + i
  );

  return (
    <div className="flex items-center pt-10 justify-center">
      <button
        className="size-5"
        onClick={() => setCurrentPages(prev => (prev === 1 ? 1 : prev - 1))}
      >
        <ArrowButton aria-label="ArrowButton" className="fill-gs-40"/>
      </button>
      {pages.map(page => (
        <button
          key={page}
          onClick={() => setCurrentPages(page)}
          disabled={page === currentPages}
          className={`${page === currentPages ? activeBtn : BaseBtn}`}
        >
          {page}
        </button>
      ))}
      <button
        className="size-5"
        onClick={() =>
          setCurrentPages(prev => (prev === totalPages ? totalPages : prev + 1))
        }
      >
        <ArrowButton aria-label="ArrowButton" className="rotate-[180deg] fill-gs-40" />
      </button>
    </div>
  );
}

export default memo(Pagination, (prev, next) => {
  if (prev.currentPages !== next.currentPages) return false;
  if (prev.totalPages !== next.totalPages) return false;
  if (prev.setCurrentPages !== next.setCurrentPages) return false;
  return true;
});
