import ArrowRight from "../../assets/images/Arrow-right.svg?react";

export default function Button({ children }) {
  return (
    <button className="flex justify-between items-center w-[161px] px-4 py-2 text-bn-40 bg-[#F5F1EE] rounded-[8px] border-bn-40 border text-[16px]">
      {children}
      <ArrowRight className="size-[18px]"/>
    </button>
  );
}
