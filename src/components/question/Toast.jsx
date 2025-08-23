import { useEffect } from 'react';

function Toast(props) {
  useEffect(() => {
    const timer = setTimeout(() => {
      props.setIsToast(false);
    }, 5000);
    return () => {
      clearTimeout(timer);
    };
  });

  return (
    <div className="px-[20px] py-[12px]  bg-gs-60 rounded-[8px] fixed bottom-[60px] max-sm:bottom-[100px] text-center">
      <span className=" text-gs-10">URL이 복사되었습니다</span>
    </div>
  );
}

export default Toast;
