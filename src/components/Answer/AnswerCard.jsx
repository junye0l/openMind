import { useEffect, useRef, useState } from 'react';
import LikeButtonViewOnly from './LikeButtonViewOnly/LikeButtonViewOnly';

import ProfileImg from '../../assets/images/profile_img.svg?react';
import MoreIcon from '../../assets/images/More.svg?react';
import EditIcon from '../../assets/images/Edit.svg?react';
import CloseIcon from '../../assets/images/Close.svg?react';

export default function AnswerCard({
  questionId,
  author,
  authorImage,
  question,
  createdAt,
  answer,
  like = 0,
  dislike = 0,
  onCreate,
  onEdit,
  onDelete,
}) {
  const [mode, setMode] = useState('idle');
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  const [text, setText] = useState('');
  const [editText, setEditText] = useState('');
  const [saving, setSaving] = useState(false);
  const [editing, setEditing] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState('');

  const isAnswered = answer;

  // 답변 이전값 비교하기 (수정버튼 개선)
  const originalContent = (answer?.content ?? '').trim();
  const editedContent = editText.trim();
  const isEditedChanged = editedContent !== originalContent;
  const canSubmitEdit = isEditedChanged && editedContent.length > 0 && !editing;

  useEffect(() => {
    if (isAnswered) setEditText(answer.content ?? '');
  }, [isAnswered, answer?.content]);

  useEffect(() => {
    const onClickOutside = e => {
      if (!menuRef.current) return;
      if (!menuRef.current.contains(e.target)) setMenuOpen(false);
    };
    if (menuOpen) document.addEventListener('mousedown', onClickOutside);
    return () => document.removeEventListener('mousedown', onClickOutside);
  }, [menuOpen]);

  const handleCreate = async () => {
    if (!text.trim()) return;
    try {
      setSaving(true);
      setError('');
      await onCreate(questionId, text.trim());
      setText('');
    } catch (e) {
      setError(e?.message || '답변 생성 중 오류가 발생했습니다.');
    } finally {
      setSaving(false);
    }
  };

  const handlePatch = async () => {
    if (!editText.trim() || !answer?.id) return;
    if (!isEditedChanged) {
      setError('변경된 내용이 없습니다.');
      return;
    }
    try {
      setEditing(true);
      setError('');
      await onEdit(answer.id, editText.trim());
      setMode('idle');
    } catch (e) {
      setError(e?.message || '수정 중 오류가 발생했습니다.');
    } finally {
      setEditing(false);
    }
  };

  const handleDelete = async () => {
    if (!answer?.id) return;
    try {
      setDeleting(true);
      setError('');
      await onDelete(answer.id);
      setMode('idle');
    } catch (e) {
      setError(e?.message || '삭제 중 오류가 발생했습니다.');
    } finally {
      setDeleting(false);
    }
  };

  return (
    <article className="bg-gs-10 w-full max-w-[652px] rounded-[16px] p-8 md:p-[32px] mt-[20px] flex flex-col items-start gap-[24px]">
      <div className="w-full flex items-center">
        <span
          className={`px-[12px] py-[4px] text-[14px] font-medium border border-solid rounded-[8px] ${
            isAnswered ? 'text-bn-40 border-bn-40' : 'text-gs-40 border-gs-40'
          }`}
        >
          {isAnswered ? '답변완료' : '미답변'}
        </span>

        <div className="ml-auto relative" ref={menuRef}>
          {/* 케밥 버튼 컴포넌트화 시키기 */}
          <button
            type="button"
            aria-haspopup="menu"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen(v => !v)}
            onKeyDown={e =>
              (e.key === 'Enter' || e.key === ' ') && setMenuOpen(v => !v)
            }
            className="h-6 w-6 flex items-center justify-center rounded-full hover:bg-gs-20 cursor-pointer focus:outline-none focus:ring-2 focus:ring-bn-30"
          >
            <MoreIcon className="h-4 w-4" aria-hidden />
          </button>

          {menuOpen && (
            <div
              role="menu"
              aria-label="카드 메뉴"
              className="absolute right-0 top-8 w-[140px] rounded-md bg-white shadow-md ring-1 ring-gs-30 p-1 z-20 flex flex-col"
            >
              <button
                type="button"
                role="menuitem"
                onClick={() => {
                  if (!isAnswered) return;
                  setEditText(answer?.content ?? '');
                  setMode('editing');
                  setMenuOpen(false);
                }}
                className="group flex items-center gap-2 h-[34px] w-full rounded-[6px] px-2 text-[13px] text-gs-50 hover:bg-gs-20 hover:text-bn-50"
              >
                <EditIcon className="w-4 h-4" aria-hidden />
                수정하기
              </button>

              <button
                type="button"
                role="menuitem"
                onClick={() => {
                  if (!isAnswered) return;
                  setMode('confirm-delete');
                  setMenuOpen(false);
                }}
                className="group flex items-center gap-2 h-[34px] w-full rounded-[6px] px-2 text-[13px] text-gs-50 hover:bg-gs-20 hover:text-bn-50"
              >
                <CloseIcon className="w-4 h-4" aria-hidden />
                답변삭제
              </button>
            </div>
          )}
        </div>
      </div>

      {/* 질문 */}
      <div className="flex flex-col gap-[4px]">
        <p className="text-[14px] font-medium text-gs-40">질문 · {createdAt}</p>
        <p className="text-[18px] font-normal break-anywhere">{question}</p>
      </div>

      {/* 답변 입력 */}
      <div className="w-full">
        <div className="flex gap-[12px]">
          {authorImage ? (
            <img
              src={authorImage}
              alt={`${author} 프로필`}
              className="w-10 h-10 md:w-[48px] md:h-[48px] rounded-full object-cover"
            />
          ) : (
            <ProfileImg className="w-10 h-10 md:w-[48px] md:h-[48px]" />
          )}
          <div className="flex-1 flex flex-col gap-[8px] min-w-0">
            <p className="text-[18px] font-normal">{author}</p>

            {!isAnswered && mode !== 'editing' && (
              <textarea
                value={text}
                onChange={e => setText(e.target.value)}
                placeholder="답변을 입력해주세요"
                className="min-h-[120px] w-full resize-none rounded-lg bg-gs-20 border border-gs-30 px-3 py-2 text-[14px] text-gs-50 outline-none"
              />
            )}

            {isAnswered && mode !== 'editing' && (
              <div className="text-[16px] whitespace-pre-wrap break-anywhere">
                {answer.content}
              </div>
            )}

            {mode === 'editing' && (
              <textarea
                value={editText}
                onChange={e => setEditText(e.target.value)}
                placeholder="답변을 수정해주세요"
                className="min-h-[120px] w-full resize-none rounded-lg bg-gs-20 border border-gs-30 px-3 py-2 text-[14px] text-gs-50 outline-none"
              />
            )}

            <div className="mt-[16px] w-full">
              {!isAnswered &&
                mode !== 'editing' &&
                mode !== 'confirm-delete' && (
                  <button
                    type="button"
                    onClick={handleCreate}
                    disabled={!text.trim() || saving}
                    className={`w-full h-11 rounded-lg flex items-center justify-center text-[14px] font-semibold ${
                      text.trim() && !saving
                        ? 'bg-bn-40 text-gs-10'
                        : 'bg-bn-30 text-gs-10/80 cursor-not-allowed'
                    }`}
                  >
                    {saving ? '저장 중…' : '답변 완료'}
                  </button>
                )}

              {mode === 'editing' && (
                <div className="w-full flex flex-col gap-2">
                  <button
                    type="button"
                    onClick={handlePatch}
                    disabled={!canSubmitEdit}
                    className={`w-full h-11 rounded-lg flex items-center justify-center text-[14px] font-semibold ${
                      canSubmitEdit
                        ? 'bg-bn-40 text-gs-10'
                        : 'bg-bn-30 text-gs-10/80 cursor-not-allowed'
                    }`}
                  >
                    {editing ? '수정 중…' : '수정 완료'}
                  </button>
                  <button
                    type="button"
                    onClick={() => setMode('idle')}
                    className="w-full h-11 rounded-lg border border-gs-30 text-[14px]"
                  >
                    취소
                  </button>
                </div>
              )}

              {mode === 'confirm-delete' && (
                <div className="w-full flex flex-col gap-2">
                  <button
                    type="button"
                    onClick={handleDelete}
                    disabled={deleting}
                    className="w-full h-11 rounded-lg bg-red-500 text-white text-[14px] font-semibold hover:opacity-90"
                  >
                    {deleting ? '삭제 중…' : '답변을 삭제하시겠습니까?'}
                  </button>
                  <button
                    type="button"
                    onClick={() => setMode('idle')}
                    className="w-full h-11 rounded-lg border border-gs-30 text-[14px]"
                  >
                    취소
                  </button>
                </div>
              )}

              {error && (
                <div className="mt-3 text-[13px] text-red-600">{error}</div>
              )}
            </div>
          </div>
        </div>

        <LikeButtonViewOnly
          questionId={questionId}
          like={like}
          dislike={dislike}
        />
      </div>
    </article>
  );
}
