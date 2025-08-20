import { useEffect, useRef, useState } from 'react';

// SVG를 React 컴포넌트로 임포트 (svgr)
import AnswerComplete from '../assets/images/answer_complete.svg?react';
import AnswerNo from '../assets/images/answer_no.svg?react';
import CloseIcon from '../assets/images/Close.svg?react';
import EditIcon from '../assets/images/Edit.svg?react';
import FacebookIcon from '../assets/images/Facebook.svg?react';
import KakaoIcon from '../assets/images/Kakaotalk.svg?react';
import LinkIcon from '../assets/images/Link.svg?react';
import Logo from '../assets/images/logo.svg?react';
import HeroBg from '../assets/images/main_bg.svg?react';
import MessagesIcon from '../assets/images/Messages.svg?react';
import MoreIcon from '../assets/images/More.svg?react';
import ProfileImg from '../assets/images/profile_img.svg?react';
import ThumbsDownIcon from '../assets/images/thumbs-down.svg?react';
import ThumbsUpIcon from '../assets/images/thumbs-up.svg?react';

export default function Answer() {
  return (
    <div className="min-h-screen w-full bg-gs-10">
      {/* 헤더 */}
      <header className="relative w-full">
        {/* 배경 SVG를 컴포넌트로 렌더링 */}
        <HeroBg className="w-full h-[234px]" />
        {/* 중앙 스택 */}
        <div className="absolute inset-x-0 top-[50px] z-10 flex flex-col items-center gap-3">
          {/* 로고 */}
          <div className="w-[170px] h-[67px] flex items-center justify-center">
            <Logo className="max-w-full max-h-full" aria-label="OpenMind" />
          </div>
          {/* 프로필 */}
          <div className="w-[136px] h-[136px] rounded-full overflow-hidden ring-4 ring-gs-10 shadow">
            <ProfileImg className="w-full h-full" aria-label="프로필" />
          </div>
          {/* 사용자명 */}
          <div className="w-[177px] h-[40px] flex items-center justify-center">
            <span className="text-[18px] font-semibold leading-none text-bn-50">
              아초는고양이
            </span>
          </div>
          {/* SNS 링크 */}
          <div className="w-[144px] h-[40px] flex items-center justify-center gap-2 text-gs-50">
            <LinkIcon className="h-5 w-5 fill-current" aria-hidden />
            <KakaoIcon className="h-5 w-5 fill-current" aria-hidden />
            <FacebookIcon className="h-5 w-5 fill-current" aria-hidden />
          </div>
        </div>
      </header>

      {/* 삭제하기 버튼, 여기서 삭제시 프로필 전체를 삭제(초기화)해버리기 */}
      <div className="w-full px-[242px] mt-[150px] mb-[10px]">
        <div className="max-w-[1120px] mx-auto flex justify-end">
          <div
            role="button"
            tabIndex={0}
            className="w-[100px] h-[35px] rounded-full bg-bn-40 text-gs-10 text-sm font-medium flex items-center justify-center hover:opacity-90"
          >
            삭제하기
          </div>
        </div>
      </div>

      {/* 섹션 래퍼 */}
      <main className="w-full px-[242px] pb-[140px]">
        <section className="w-full max-w-[1120px] mx-auto rounded-2xl border border-bn-20 bg-bn-10 shadow-sm p-6">
          <div className="w-[216px] h-[25px] mx-auto text-bn-40 text-[13px] font-semibold flex items-center justify-center gap-1.5 mb-4">
            <MessagesIcon className="w-4 h-4" aria-hidden />
            3개의 질문이 있습니다
          </div>

          {/* 카드들 */}
          <AnswerCard />
          <AnswerCard />
        </section>
      </main>
    </div>
  );
}

function AnswerCard() {
  const [text, setText] = useState('');
  const [savedText, setSavedText] = useState('');
  const [isAnswered, setIsAnswered] = useState(false);

  // 편집 모드
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState('');

  // 드롭다운
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedAction, setSelectedAction] = useState(null); // 'edit' | 'delete' | null
  const menuRef = useRef(null);

  // 좋아요/싫어요(like, dislike, null)
  const [vote, setVote] = useState(null);

  useEffect(() => {
    const onClickOutside = e => {
      if (!menuRef.current) return;
      if (!menuRef.current.contains(e.target)) setMenuOpen(false);
    };
    if (menuOpen) document.addEventListener('mousedown', onClickOutside);
    return () => document.removeEventListener('mousedown', onClickOutside);
  }, [menuOpen]);

  const toggleMenu = () => setMenuOpen(v => !v);

  const handleSelect = action => {
    if (action === 'edit' && !isAnswered) return; // 답변 완료 전엔 비활성
    if (action === 'edit') {
      setSelectedAction('edit');
      setEditText(savedText);
      setIsEditing(true);
      setMenuOpen(false);
      return;
    }
    if (action === 'delete') {
      setSelectedAction('delete');
      setMenuOpen(false);
      // 삭제 로직 추가하기, 여기서 삭제하면 해당 질문만 삭제하기
    }
  };

  const handleSubmit = () => {
    if (!text.trim()) return;
    setSavedText(text.trim());
    setIsAnswered(true);
    setIsEditing(false);
  };

  const handleEditSubmit = () => {
    if (!editText.trim()) return;
    setSavedText(editText.trim());
    setIsEditing(false);
  };

  // 좋아요싫어요 하나만 선택 같은 버튼 두 번 누르면 해제
  const toggleVote = choice =>
    setVote(prev => (prev === choice ? null : choice));

  return (
    <article className="mx-auto my-6 w-[684px] rounded-2xl bg-gs-10 ring-1 ring-bn-20 shadow-sm overflow-hidden">
      <div className="w-full p-8 flex flex-col items-center">
        <div className="w-[620px] h-[26px] flex items-center justify-between relative">
          {/* 상태 아이콘 */}
          {isAnswered ? (
            <AnswerComplete
              className="w-[76px] h-[26px]"
              aria-label="답변완료"
            />
          ) : (
            <AnswerNo className="w-[61px] h-[26px]" aria-label="미답변" />
          )}

          {/* 더보기 드롭다운 리스트 */}
          <div className="relative" ref={menuRef}>
            <button
              type="button"
              aria-haspopup="menu"
              aria-expanded={menuOpen}
              onClick={toggleMenu}
              onKeyDown={e =>
                (e.key === 'Enter' || e.key === ' ') && toggleMenu()
              }
              className="h-6 w-6 flex items-center justify-center rounded-full hover:bg-gs-20 cursor-pointer focus:outline-none focus:ring-2 focus:ring-bn-30"
            >
              <MoreIcon className="h-4 w-4" aria-hidden />
            </button>

            {menuOpen && (
              <div
                role="menu"
                aria-label="카드 메뉴"
                className="absolute right-0 top-8 w-[120px] h-[68px] rounded-md bg-white shadow-md ring-1 ring-gs-30 p-1 z-20 flex flex-col"
              >
                {/* 수정하기 */}
                <button
                  type="button"
                  role="menuitem"
                  onClick={() => handleSelect('edit')}
                  className={`group flex items-center justify-between gap-2 h-[34px] w-full rounded-[6px] px-2 text-[13px]
                    ${selectedAction === 'edit' ? 'text-b50' : 'text-gs-50'}
                    hover:bg-gs-20 hover:text-bn-50 focus:outline-none`}
                >
                  <span className="inline-flex items-center gap-2">
                    <EditIcon className="w-4 h-4" aria-hidden />
                    수정하기
                  </span>
                </button>

                {/* 삭제하기, 여기서 삭제하면 해당 질문만 삭제하기*/}
                <button
                  type="button"
                  role="menuitem"
                  onClick={() => handleSelect('delete')}
                  className={`group flex items-center justify-between gap-2 h-[34px] w-full rounded-[6px] px-2 text-[13px]
                    ${selectedAction === 'delete' ? 'text-b50' : 'text-gs-50'}
                    hover:bg-gs-20 hover:text-bn-50 focus:outline-none`}
                >
                  <span className="inline-flex items-center gap-2">
                    <CloseIcon className="w-4 h-4" aria-hidden />
                    삭제하기
                  </span>
                </button>
              </div>
            )}
          </div>
        </div>

        {/* 질문 영역 */}
        <div className="w-[620px] mt-4">
          <div className="text-[12px] text-gs-40">질문 · 2주전</div>
          <div className="mt-1 text-[18px] font-semibold text-bn-50 leading-6">
            좋아하는 동물은?
          </div>
        </div>

        {/* 본문 */}
        <div className="w-[620px] mt-4">
          <div className="flex gap-3">
            <div className="h-12 w-12 rounded-full overflow-hidden bg-bn-20 flex-shrink-0">
              <ProfileImg className="w-full h-full" aria-hidden />
            </div>

            <div className="flex-1">
              <div className="text-[14px] font-medium mb-2 text-bn-50">
                아초는고양이
              </div>

              <div className="w-[520px]">
                {!isAnswered && !isEditing && (
                  <textarea
                    value={text}
                    onChange={e => setText(e.target.value)}
                    placeholder="답변을 입력해주세요"
                    className="min-h-[120px] w-full resize-none rounded-lg bg-gs-20 border border-gs-30 px-3 py-2 text-[14px] text-gs-50 outline-none"
                  />
                )}

                {isAnswered && !isEditing && (
                  <div
                    className="w-full px-1 py-1 text-[14px] text-bn-50 whitespace-pre-wrap"
                    aria-label="작성한 답변"
                  >
                    {savedText}
                  </div>
                )}

                {isEditing && (
                  <textarea
                    value={editText}
                    onChange={e => setEditText(e.target.value)}
                    placeholder="답변을 수정해주세요"
                    className="min-h-[120px] w-full resize-none rounded-lg bg-gs-20 border border-gs-30 px-3 py-2 text-[14px] text-gs-50 outline-none"
                  />
                )}
              </div>
            </div>
          </div>

          {/* 하단 버튼 */}
          {!isAnswered && !isEditing && (
            <div className="ml-[60px] mt-4">
              <button
                type="button"
                className={`w-[520px] h-11 rounded-lg flex items-center justify-center text-[14px] font-semibold ${
                  text.trim()
                    ? 'bg-bn-40 text-gs-10 cursor-pointer'
                    : 'bg-bn-30 text-gs-10/80 cursor-not-allowed'
                }`}
                disabled={!text.trim()}
                onClick={handleSubmit}
              >
                답변 완료
              </button>
            </div>
          )}

          {isEditing && (
            <div className="ml-[60px] mt-4">
              <button
                type="button"
                className={`w-[520px] h-11 rounded-lg flex items-center justify-center text-[14px] font-semibold ${
                  editText.trim()
                    ? 'bg-bn-40 text-gs-10 cursor-pointer'
                    : 'bg-bn-30 text-gs-10/80 cursor-not-allowed'
                }`}
                disabled={!editText.trim()}
                onClick={handleEditSubmit}
              >
                수정 완료
              </button>
            </div>
          )}
        </div>

        {/* 구분선 */}
        <div className="w-[620px] mt-6 border-t border-gs-30" />

        {/* 좋아요/싫어요 — SVG가 currentColor를 따라 색 변경 */}
        <div className="w-[620px] mt-3 flex items-center gap-3">
          <button
            type="button"
            onClick={() => toggleVote('like')}
            className={`h-9 px-3 inline-flex items-center gap-2 rounded-lg text-[14px] ${
              vote === 'like' ? 'text-b50' : 'text-gs-60'
            }`}
            aria-pressed={vote === 'like'}
          >
            <ThumbsUpIcon className="w-4 h-4 fill-current stroke-current" />
            좋아요
          </button>

          <button
            type="button"
            onClick={() => toggleVote('dislike')}
            className={`h-9 px-3 inline-flex items-center gap-2 rounded-lg text-[14px] ${
              vote === 'dislike' ? 'text-b50' : 'text-gs-60'
            }`}
            aria-pressed={vote === 'dislike'}
          >
            <ThumbsDownIcon className="w-4 h-4 fill-current stroke-current" />
            싫어요
          </button>
        </div>
      </div>
    </article>
  );
}
