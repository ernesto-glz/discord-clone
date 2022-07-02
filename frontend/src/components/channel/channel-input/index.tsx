import React, { useRef, useState } from 'react';
import useFetchAndLoad from 'src/hooks/useFetchAndLoad';
import { MessageService } from 'src/services/message.service';
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
} from '../channel-data/styles';
import striptags from 'striptags';
import { ws } from 'src/ws/websocket';
import { PulseLoader } from 'react-spinners';
import { useAppDispatch } from 'src/redux/hooks';
import { startTyping, stopTyping } from 'src/redux/states/typing';
import useTypingUsers from 'src/hooks/useTypingUsers';
import { InputHelper } from './input-helper';
import { Channel } from 'src/redux/states/channels';

interface Props {
  placeholder: string;
  activeChannel: Channel;
}

export const MessageInput: React.FC<Props> = (props) => {
  const { callEndpoint } = useFetchAndLoad();
  const [content, setContent] = useState('');
  const messageBoxRef = useRef<HTMLDivElement>(null);
  const dispatch = useAppDispatch();
  const { typingUsers } = useTypingUsers();

  const onKeyUp = async (event: React.KeyboardEvent<HTMLDivElement>) => {
    const text = event.currentTarget!.innerText.trim();
    setContent(text);

    if (text === '') {
      if (event.key === 'Backspace')
        dispatch(stopTyping(props.activeChannel._id));
      return;
    }

    dispatch(startTyping(props.activeChannel._id));
    const emptyMessage = content.replaceAll('\n', '');

    if (event.key !== 'Enter' || !emptyMessage || event.shiftKey) return;

    const { data } = await callEndpoint(
      MessageService.createMessage({
        channelId: props.activeChannel._id,
        content: striptags(content, 'a')
      })
    );

    dispatch(stopTyping(props.activeChannel._id));
    ws.emit('MESSAGE_CREATE', data);

    setContent('');
    messageBoxRef.current!.innerText = '';
  };

  const onKeyDown = async (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Enter' && !event.shiftKey) event.preventDefault();
  };

  return (
    <MessageBoxContainer>
      <InputContainer>
        <InputWrapper>
          <div className="scrollerBase inputScroller">
            <InputLeftSide>
              <UploadPlusIcon />
            </InputLeftSide>
            <Wrapper>
              {content.length < 1 && (
                <Placeholder>{props.placeholder ?? 'Unknown'}</Placeholder>
              )}
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
