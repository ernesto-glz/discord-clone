import React, { useEffect, useRef, useState } from 'react';
import { PulseLoader } from 'react-spinners';
import { startTyping, stopTyping } from 'src/redux/states/typing';
import { InputSlate } from './InputSlate';
import { Entity } from '@discord/types';
import { useAppDispatch } from 'src/redux/hooks';
import { createMessage } from 'src/redux/states/messages';
import { useScrollbarState } from 'src/hooks/useScrollbarState';
import { PlusCircleFill } from '@styled-icons/bootstrap';
import useTypingUsers from 'src/hooks/useTypingUsers';

interface Props {
  placeholder: string;
  channel: Entity.Channel;
  scrollbarRef: React.RefObject<HTMLDivElement>;
}

export const MessageInput: React.FC<Props> = (props) => {
  const [content, setContent] = useState('');
  const messageBoxRef = useRef<HTMLDivElement>(null);
  const dispatch = useAppDispatch();
  const { typingUsers } = useTypingUsers();
  const { stuckAtBottom } = useScrollbarState();

  const onChange = (ev: React.KeyboardEvent<HTMLDivElement>) => {
    const textContent = ev.currentTarget.textContent!.trim();
    setContent(textContent);
    dispatch(startTyping(props.channel.id));
  };

  const onKeyDown = async (ev: React.KeyboardEvent<HTMLDivElement>) => {
    // Only expand when shift is pressed
    if (ev.key === 'Enter' && !ev.shiftKey) ev.preventDefault();

    const emptyMessage = content.replaceAll('\n', '');
    if (ev.key !== 'Enter' || !emptyMessage || ev.shiftKey) return;

    dispatch(createMessage({ channelId: props.channel.id, content }));
    dispatch(stopTyping(props.channel.id));

    setContent('');
    messageBoxRef.current!.textContent = '';
  };

  useEffect(() => {
    const resizeObserver = new ResizeObserver(() => {
      if (!stuckAtBottom) return;
      props.scrollbarRef.current!.scroll({
        top: props.scrollbarRef.current?.scrollHeight,
      });
    });

    resizeObserver.observe(messageBoxRef.current!);
    return () => {
      resizeObserver.disconnect();
    };
  }, [stuckAtBottom]);

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
            onInput={onChange}
            defaultValue={content}
            contentEditable={true}
            spellCheck={false}
            suppressContentEditableWarning={true}
            dir="auto"
            data-slate-editor="true"
            data-slate-node="value"
            className="slate-textArea"
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
