import React, { useRef, useState } from 'react';
import useFetchAndLoad from 'src/hooks/useFetchAndLoad';
import { MessageService } from 'src/services/message.service';
import {
  InputContainer,
  InputWrapper,
  Input,
  InputIcon,
  TypingAnnounce,
  InputLeftSide,
  MessageBoxContainer,
  InputRightSide,
  Wrapper
} from '../channel-data/styles';
import striptags from 'striptags';
import { ws } from 'src/ws/websocket';
import { PulseLoader } from 'react-spinners';
import { useAppDispatch, useAppSelector } from 'src/redux/hooks';
import {
  getTypersInChannel,
  startTyping,
  stopTyping
} from 'src/redux/states/typing';
import { getFriend } from 'src/redux/states/friend';
import store from 'src/redux/configure-store';

interface Props {
  placeholder: string;
  activeChannel: string;
}

export const MessageInput: React.FC<Props> = (props) => {
  const { callEndpoint } = useFetchAndLoad();
  const [content, setContent] = useState('');
  const messageBoxRef = useRef<HTMLDivElement>(null);
  const dispatch = useAppDispatch();

  const selfUser = useAppSelector((s) => s.user)!;
  const channel = useAppSelector((s) => s.ui.activeChannel)!;
  const notSelf = (t: any) => t.userId !== selfUser._id;
  const typers = useAppSelector(getTypersInChannel(channel)).filter(notSelf);

  const user = (userId: string) => getFriend(userId)(store.getState());
  const typingUsers = typers.map((t) => user(t.userId)!.username).join(', ');

  const onKeyUp = async (event: React.KeyboardEvent<HTMLDivElement>) => {
    const text = event.currentTarget!.innerText.trim();

    if (text === '') return;
    else if (event.key === 'Enter' && !event.shiftKey) event.preventDefault();

    setContent(text);

    dispatch(startTyping(props.activeChannel));
    const emptyMessage = content.replaceAll('\n', '');
    if (event.key !== 'Enter' || !emptyMessage || event.shiftKey) return;

    const messageData = {
      channelId: props.activeChannel,
      content: striptags(content, 'a')
    };

    const { data } = await callEndpoint(
      MessageService.createMessage(messageData)
    );

    dispatch(stopTyping(props.activeChannel));
    ws.emit('MESSAGE_CREATE', data);
    setContent('');
    messageBoxRef.current!.innerText = '';
  };

  return (
    <MessageBoxContainer>
      <InputContainer>
        <InputWrapper>
          <div className="scrollerBase inputScroller">
            <InputLeftSide>
              <InputIcon />
            </InputLeftSide>
            <Wrapper>
              <Input
                id="messageInput"
                ref={messageBoxRef}
                role="textbox"
                onKeyUp={onKeyUp}
                defaultValue={content}
                placeholder={props.placeholder ?? 'Unknown'}
                contentEditable={true}
              />
            </Wrapper>
            <InputRightSide>
              <InputIcon />
            </InputRightSide>
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
