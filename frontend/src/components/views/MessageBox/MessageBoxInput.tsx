import React, { ClipboardEvent, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from 'src/redux/hooks';
import { startTyping, stopTyping } from 'src/redux/states/typing';
import { InputSlate } from '../channel/InputSlate';
import { findCodeBlocks, getCaretOffset, normalizeHtml } from 'src/utils/dom';
import { getChannelMessages } from 'src/redux/states/messages';
import { actions as ui } from 'src/redux/states/ui';

interface Props {
  contentState: [string, any];
  boxInputRef: React.RefObject<HTMLDivElement>;
  saveMessage: () => void;
  scrollToBottom: () => void;
}

export const MessageBoxInput: React.FC<Props> = (props) => {
  const { contentState, boxInputRef, saveMessage, scrollToBottom  } = props;
  const [canSend, setCandSend] = useState(true);
  const [content, setContent] = contentState;
  const channel = useAppSelector((s) => s.ui.activeChannel)!;
  const messages = useAppSelector(getChannelMessages(channel.id));
  const selfUser = useAppSelector((s) => s.auth.user)!;
  const lastMessage = messages[messages.length -1];
  const dispatch = useAppDispatch();

  const validateCanSend = () => {
    const contentWithoutLineBreaks = boxInputRef.current!.textContent!;
    const caretOffset = getCaretOffset(boxInputRef.current!);

    /* Use content without line-breaks to get codeBlocks
     * in favor of avoid wrong index.
     */
    const codeBlocks = findCodeBlocks(contentWithoutLineBreaks);

    for (const block of codeBlocks) {
      if (block.type === 'opening' && caretOffset > block.endIndex)
        setCandSend(false);
      if (block.type === 'closing' && caretOffset > block.endIndex)
        setCandSend(true);
    }

    if (!codeBlocks.length && !canSend) setCandSend(true);
  }

  const onInput = (ev: React.KeyboardEvent<HTMLDivElement>) => {
    const contentWithLinkeBreaks = ev.target.innerText;
    setContent(normalizeHtml(contentWithLinkeBreaks));
    dispatch(startTyping(channel.id));
  };

  // TODO: Stoptyping when content is empty.
  const onKeyDown = async (ev: React.KeyboardEvent<HTMLDivElement>) => {
    if (ev.key === 'Enter' && !ev.shiftKey && canSend) ev.preventDefault();

    // Start edit last message
    if (ev.key === 'ArrowUp' && lastMessage && !content) {
      // Verify if user is the owner.
      if (lastMessage.sender !== selfUser.id) return;
      dispatch(ui.startedEditingMessage(lastMessage.id));
      setTimeout(() => scrollToBottom(), 100);
      return;
    }

    const emptyMessage = content.replaceAll('\n', '');
    if (ev.key !== 'Enter' || !emptyMessage || ev.shiftKey || !canSend) return;

    dispatch(stopTyping(channel.id));
    saveMessage();
  };

  const onKeyUp = () => validateCanSend();

  const onPaste = (ev: ClipboardEvent<HTMLDivElement>) => {
    ev.preventDefault();
    const text = ev.clipboardData.getData('text');
    document.execCommand('insertText', false, text);
  };

  useEffect(() => {
    if (!boxInputRef?.current || !content) return;
    validateCanSend();
  }, [])

  return (
    <div
      id="messageInput"
      tabIndex={0}
      ref={boxInputRef}
      autoCorrect="off"
      onKeyDown={onKeyDown}
      onInput={onInput}
      onKeyUp={onKeyUp}
      onPaste={onPaste}
      defaultValue={content}
      dir="auto"
      aria-multiline="true"
      data-slate-editor="true"
      data-slate-node="value"
      className="slate-textArea"
      spellCheck={false}
      contentEditable={true}
      suppressContentEditableWarning={true}
    >
      <InputSlate />
    </div>
  );
};
