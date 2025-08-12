export default function Pagination({
  currenPages,
  totalPages,
  setCurrentPages,
}) {
  const BaseBtn = `text-[20px] text-[#818181] px-4 py-2`;
  const activeBtn = `text-[20px] px-4 py-2 text-[#542F1A]`;

  return (
    <div className="flex items-center pt-10 justify-center">
      <button
        className="size-5"
        onClick={() => setCurrentPages(prev => (prev === 1 ? 1 : prev - 1))}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="#818181"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M8.46967 11.4697C8.17678 11.7626 8.17678 12.2374 8.46967 12.5303L14.4697 18.5303C14.7626 18.8232 15.2374 18.8232 15.5303 18.5303C15.8232 18.2374 15.8232 17.7626 15.5303 17.4697L10.0607 12L15.5303 6.53033C15.8232 6.23744 15.8232 5.76256 15.5303 5.46967C15.2374 5.17678 14.7626 5.17678 14.4697 5.46967L8.46967 11.4697Z"
            fill="#818181"
          />
        </svg>
      </button>
      {Array.from({ length: totalPages }, (item, i) => i + 1).map(page => (
        <button
          key={page}
          onClick={() => setCurrentPages(page)}
          disabled={page === currenPages}
          className={`${page === currenPages ? activeBtn : BaseBtn}`}
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
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="#818181"
          transform="rotate(180)"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M8.46967 11.4697C8.17678 11.7626 8.17678 12.2374 8.46967 12.5303L14.4697 18.5303C14.7626 18.8232 15.2374 18.8232 15.5303 18.5303C15.8232 18.2374 15.8232 17.7626 15.5303 17.4697L10.0607 12L15.5303 6.53033C15.8232 6.23744 15.8232 5.76256 15.5303 5.46967C15.2374 5.17678 14.7626 5.17678 14.4697 5.46967L8.46967 11.4697Z"
            fill="#818181"
          />
        </svg>
      </button>
    </div>
  );
}
