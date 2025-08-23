import { useState } from 'react';
import LinkImg from '../../../assets/images/Link.svg?react';
import Toast from '../Toast';

const CopyUrlButton = () => {
  const [istoast, setIsToast] = useState(false);
  const currentUrl = window.location.href;
  const handleCopyUrl = () => {
    navigator.clipboard
      .writeText(currentUrl)
      .then(() => {
        setIsToast(true);
      })
      .catch(error => {
        setIsToast(false);
      });
  };

  return (
    <>
      <button
        onClick={handleCopyUrl}
        className="p-[11px] bg-bn-40 flex justify-center items-center rounded-full"
      >
        <LinkImg className="fill-gs-10" aria-label="링크 복사 아이콘" />
      </button>
      {istoast && <Toast setIsToast={setIsToast} />}
    </>
  );
};

export default CopyUrlButton;
