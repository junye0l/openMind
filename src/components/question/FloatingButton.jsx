function FloatingButton() {
  return (
    <div className="max-w-full fixed bottom-[24px] right-[24px]">
      <button
        className="px-[49.5px] py-[14.5px] max-sm:px-[24px] bg-bn-40 text-gs-10 shadow-[0_4px_4px_rgba(0,0,0,0.25)] rounded-full hover:opacity-90"
        onClick={() =>
          window.dispatchEvent(new CustomEvent('open-question-modal'))
        }
      >
        질문 작성하기
      </button>
    </div>
  );
}

export default FloatingButton;
