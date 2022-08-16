import React, { useEffect, useRef, useState } from 'react';
import { useAppDispatch, useAppSelector } from 'src/store/hooks';
import { useResizeObserver } from 'src/hooks/useResizeObserver';
import { MessageBoxFooter } from './MessageBoxFooter';
import { MessageBoxInput } from './MessageBoxInput';
import { MessageBoxLeftSide } from './MessageBoxLeftSide';
import { MessageBoxRightSide } from './MessageBoxRightSide';
import { actions as ui } from 'src/store/states/ui';
import { createMessage, updateMessage } from 'src/store/states/messages';
import classNames from 'classnames';
import { replaceCaret } from 'src/utils/dom';

interface Props {
  content?: string;
  scrollbarRef?: React.RefObject<HTMLDivElement>;
  editMode?: boolean;
}

export const MessageBox: React.FC<Props> = (props) => {
  const [content, setContent] = useState(props.content ?? '');
  const channel = useAppSelector((s) => s.ui.activeChannel)!;
  const { scrollbarRef, editMode } = props;
  const messageBoxRef = useRef<HTMLDivElement>(null);
  const editingMessageId = useAppSelector((s) => s.ui.editingMessageId);
  const {} = useResizeObserver({ scrollbarRef });
  const dispatch = useAppDispatch();

  const focusInput = () => {
    if (!messageBoxRef.current) return;
    const isFocused = document.activeElement?.id === messageBoxRef.current.id;
    if (isFocused) return;
    messageBoxRef.current.focus();
    replaceCaret(messageBoxRef.current);
  }

  const resetValue = () => {
    setContent('');
    messageBoxRef.current!.textContent = '';
  }

  const saveMessage = () => {
    (editingMessageId)
      ? dispatch(updateMessage(editingMessageId, { content }))
      : dispatch(createMessage({ channelId: channel.id, content: content.trim() }));

    resetValue();
    dispatch(ui.stoppedEditingMessage());
  };

  const scrollToBottom = () => {
    if (!scrollbarRef?.current) return;
    const scroll = scrollbarRef.current;
    scroll.scrollTop = scroll.scrollHeight;
  };

  useEffect(() => {
    if (!messageBoxRef.current) return;
    messageBoxRef.current.innerText = content;
    messageBoxRef.current.focus();
    replaceCaret(messageBoxRef.current);

    document.addEventListener('keydown', focusInput);
    return () => {
      document.removeEventListener('keydown', focusInput);
    }
  }, []);

  return (
    <div className={classNames('message-box', { 'editMode': editMode })}>
      <div className="input-wrapper">
        <div className="scrollerBase inputScroller">
          <MessageBoxLeftSide editMode={editMode} />
          {content.length < 1 && !editMode && (
            <p className="placeholder">{`Message @${channel.name!}`}</p>
          )}
          <MessageBoxInput
            boxInputRef={messageBoxRef}
            contentState={[content, setContent]}
            saveMessage={saveMessage}
            scrollToBottom={scrollToBottom}
            resetValue={resetValue}
          />
          <MessageBoxRightSide />
        </div>
      </div>
      <MessageBoxFooter saveMessage={saveMessage} editMode={editMode} />
    </div>
  );
};
