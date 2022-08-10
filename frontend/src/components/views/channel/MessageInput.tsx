import React, { ClipboardEvent, useRef, useState } from 'react';
import { PulseLoader } from 'react-spinners';
import { startTyping, stopTyping } from 'src/redux/states/typing';
import { InputSlate } from './InputSlate';
import { Entity } from '@discord/types';
import { useAppDispatch } from 'src/redux/hooks';
import { createMessage } from 'src/redux/states/messages';
import { useScrollbarState } from 'src/hooks/useScrollbarState';
import { PlusCircleFill } from '@styled-icons/bootstrap';
import { useResizeObserver } from 'src/hooks/useResizeObserver';
import { findCodeBlocks, getCaretOffset } from 'src/utils/dom';
import { useTypingUsers } from 'src/hooks/useTypingUsers';

interface Props {
  placeholder: string;
  channel: Entity.Channel;
  scrollbarRef: React.RefObject<HTMLDivElement>;
}

export const MessageInput: React.FC<Props> = (props) => {
  const [canSend, setCandSend] = useState(true);
  const { scrollbarRef, channel } = props;
  const [content, setContent] = useState('');
  const messageBoxRef = useRef<HTMLDivElement>(null);
  const { typingUsers } = useTypingUsers();
  const { stuckAtBottom } = useScrollbarState();
  const dispatch = useAppDispatch();
  useResizeObserver(
    () => {
      const scrollbar = scrollbarRef.current!;
      if (!stuckAtBottom) return;
      scrollbar.scroll({ top: scrollbar.scrollHeight });
    },
    messageBoxRef.current!,
    [stuckAtBottom]
  );

  const onInput = (ev: React.KeyboardEvent<HTMLDivElement>) => {
    const contentWithLinkeBreaks = ev.target.innerText;
    const contentWithoutLineBreaks = ev.currentTarget.textContent!;

    /* Use content without line-breaks to get codeBlocks
     * in favor of avoid wrong index.
     */
    const codeBlocks = findCodeBlocks(contentWithoutLineBreaks);
    const caretOffset = getCaretOffset(messageBoxRef.current!);

    for (const block of codeBlocks) {
      if (block.type === 'opening' && caretOffset > block.endIndex)
        setCandSend(false);
      if (block.type === 'closing' && caretOffset > block.endIndex)
        setCandSend(true);
    }

    if (!codeBlocks.length && !canSend) setCandSend(true);

    setContent(contentWithLinkeBreaks);
    dispatch(startTyping(props.channel.id));
  };

  const onKeyDown = async (ev: React.KeyboardEvent<HTMLDivElement>) => {
    if (ev.key === 'Enter' && !ev.shiftKey && canSend) ev.preventDefault();

    const emptyMessage = content.replaceAll('\n', '');
    if (ev.key !== 'Enter' || !emptyMessage || ev.shiftKey || !canSend) return;

    dispatch(createMessage({ channelId: channel.id, content: content.trim() }));
    dispatch(stopTyping(props.channel.id));

    setContent('');
    messageBoxRef.current!.textContent = '';
  };

  const onPaste = (ev: ClipboardEvent<HTMLDivElement>) => {
    // cancel paste
    ev.preventDefault();

    // get text representation of clipboard
    const text = ev.clipboardData.getData('text/plain');

    // insert text manually
    document.execCommand('insertHTML', false, text);
  };

  return (
    <div className="message-box">
      <div className="input-wrapper">
        <div className="scrollerBase inputScroller">
          <div className="message-box-left">
            <PlusCircleFill className="option upload" />
          </div>
          {content.length < 1 && (
            <p className="placeholder">{props.placeholder}</p>
          )}
          <div
            id="messageInput"
            tabIndex={0}
            ref={messageBoxRef}
            autoCorrect="off"
            onKeyDown={onKeyDown}
            onInput={onInput}
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
          <div className="message-box-right">{/* <InputIcon /> */}</div>
        </div>
      </div>

      {typingUsers.length > 0 && (
        <div className="typing-users">
          <PulseLoader color="white" size={5} speedMultiplier={0.8} />{' '}
          <strong>{typingUsers}</strong> is typing...
        </div>
      )}
    </div>
  );
};
