import React, { useEffect, useRef, useState } from 'react';
import striptags from 'striptags';
import { PulseLoader } from 'react-spinners';
import { startTyping, stopTyping } from 'src/redux/states/typing';
import useTypingUsers from 'src/hooks/useTypingUsers';
import { InputHelper } from './input-helper';
import { Entity } from '@discord/types';
import { useAppDispatch } from 'src/redux/hooks';
import { createMessage } from 'src/redux/states/messages';
import {
  InputContainer,
  InputWrapper,
  Input,
  TypingAnnounce,
  InputLeftSide,
  MessageBoxContainer,
  InputRightSide,
  Wrapper,
  Placeholder,
  UploadPlusIcon
} from '../channel/channel-panel/styles';

interface Props {
  placeholder: string;
  activeChannel: Entity.Channel;
  scrollbarRef: React.RefObject<HTMLDivElement>;
}

export const MessageInput: React.FC<Props> = (props) => {
  const [content, setContent] = useState('');
  const messageBoxRef = useRef<HTMLDivElement>(null);
  const dispatch = useAppDispatch();
  const { typingUsers } = useTypingUsers();

  const onKeyUp = async (event: React.KeyboardEvent<HTMLDivElement>) => {
    const text = event.currentTarget!.innerText.trim();
    setContent(text);

    if (text === '') {
      if (event.key === 'Backspace')
        dispatch(stopTyping(props.activeChannel.id));
      return;
    }

    dispatch(startTyping(props.activeChannel.id));
    const emptyMessage = content.replaceAll('\n', '');

    if (event.key !== 'Enter' || !emptyMessage || event.shiftKey) return;

    dispatch(createMessage({
      channelId: props.activeChannel.id,
      content: striptags(content, 'a')
    }));

    dispatch(stopTyping(props.activeChannel.id));

    setContent('');
    messageBoxRef.current!.innerText = '';
  };

  const onKeyDown = async (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Enter' && !event.shiftKey) event.preventDefault();
  };

  useEffect(() => {
    const chatInput = document.querySelector('#messageInput');
    const resizeObserver = new ResizeObserver(() => {
      props.scrollbarRef.current!.scroll({ top: props.scrollbarRef.current?.scrollHeight });
    });

    resizeObserver.observe(chatInput as HTMLDivElement);
    return () => { resizeObserver.disconnect(); };
  }, []);

  return (
    <MessageBoxContainer>
      <InputContainer>
        <InputWrapper>
          <div className="scrollerBase inputScroller">
            <InputLeftSide>
              <UploadPlusIcon />
            </InputLeftSide>
            <Wrapper>
              {content.length < 1 && <Placeholder>{props.placeholder}</Placeholder>}
              <Input
                id="messageInput"
                ref={messageBoxRef}
                autoCorrect={'off'}
                role="textbox"
                onKeyUp={onKeyUp}
                onKeyDown={onKeyDown}
                defaultValue={content}
                contentEditable={true}
                spellCheck={false}
                suppressContentEditableWarning={true}
              >
                <InputHelper />
              </Input>
            </Wrapper>
            <InputRightSide>{/* <InputIcon /> */}</InputRightSide>
          </div>
        </InputWrapper>
      </InputContainer>

      {typingUsers.length > 0 && (
        <TypingAnnounce>
          <PulseLoader color="white" size={5} speedMultiplier={0.8} />{' '}
          <strong>{typingUsers}</strong> is typing...
        </TypingAnnounce>
      )}
    </MessageBoxContainer>
  );
};
