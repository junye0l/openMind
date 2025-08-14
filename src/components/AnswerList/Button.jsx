export default function Button({ children }) {
  return (
    <button className="flex justify-between items-center w-[161px] px-4 py-2 text-bn-40 bg-[#F5F1EE] rounded-[8px] border-bn-40 border text-[16px]">
      {children}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="#542F1A"
      >
        <script xmlns="" />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M4.25 12C4.25 11.5858 4.58579 11.25 5 11.25H19C19.4142 11.25 19.75 11.5858 19.75 12C19.75 12.4142 19.4142 12.75 19 12.75H5C4.58579 12.75 4.25 12.4142 4.25 12Z"
          fill="#542F1A"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M11.4697 4.46967C11.7626 4.17678 12.2374 4.17678 12.5303 4.46967L19.5303 11.4697C19.8232 11.7626 19.8232 12.2374 19.5303 12.5303L12.5303 19.5303C12.2374 19.8232 11.7626 19.8232 11.4697 19.5303C11.1768 19.2374 11.1768 18.7626 11.4697 18.4697L17.9393 12L11.4697 5.53033C11.1768 5.23744 11.1768 4.76256 11.4697 4.46967Z"
          fill="#542F1A"
        />
      </svg>
    </button>
  );
}
