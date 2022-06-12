import React, { useEffect, useState, FormEvent } from 'react';
import { LoaderContainer } from 'src/components/Friends/styles';
import { DiscordLoadingDots } from 'src/components/LoadingSpinner';
import { useWS } from 'src/contexts/ws.context';
import useFetchAndLoad from 'src/hooks/useFetchAndLoad';
import { useAppDispatch, useAppSelector } from 'src/redux/hooks';
import {
  addMessage,
  fetchMessages,
  isLoadingMessages,
  selectMessages
} from 'src/redux/states/messages';
import { MessageService } from 'src/services/message.service';
import { compareDates, dateFormatted } from 'src/utils/date';
import { useChatInputValue } from '../../../hooks/useChatInputValue';
import ChannelMessage from '../ChannelMessage';

import {
  Container,
  Messages,
  InputContainer,
  InputWrapper,
  Input,
  InputIcon,
  MessagesContainer
} from './styles';

interface Props {
  channelId: string;
  channelName: string | null;
}

const ChannelData: React.FC<Props> = ({ channelId, channelName }) => {
  const { value: currentMessage, onChange, setValue } = useChatInputValue('');
  const messages = useAppSelector(selectMessages);
  const isLoading = useAppSelector(isLoadingMessages);
  const dispatch = useAppDispatch();
  const { callEndpoint } = useFetchAndLoad();
  const ws = useWS();
  let messagesEnd: any;

  useEffect(() => {
    if (isLoading === 'idle') {
      dispatch(fetchMessages(channelId));
    }
  }, [channelId]);

  useEffect(() => {
    const scrollToBottom = () => {
      messagesEnd.scrollIntoView();
    };
    scrollToBottom();
  }, [messagesEnd, messages, channelId]);

  useEffect(() => {
    ws.on('MESSAGE_CREATE', (newMessage, id) => {
      console.log(channelId, id);
      if (channelId !== id) return;
      dispatch(addMessage(newMessage));
    });

    return () => {
      ws.off('MESSAGE_CREATE');
    };
  }, [ws]);

  const handleSendMessage = async (e: FormEvent) => {
    e.preventDefault();
    const messageData = {
      roomId: channelId,
      content: currentMessage
    };

    const { data } = await callEndpoint(
      MessageService.createMessage(messageData)
    );

    ws.emit('MESSAGE_CREATE', data);
    setValue('');
  };

  return (
    <Container>
      {isLoading !== 'loading' ? (
        <Messages>
          <MessagesContainer>
            {messages.map((msg: any, i: number) => (
              <ChannelMessage
                key={i}
                author={msg.sender}
                date={dateFormatted(msg.createdAt)}
                content={msg.content}
                stackMessage={msg.stackMessage}
              />
            ))}
            <div className="lastMessage" ref={(el) => (messagesEnd = el)} />
          </MessagesContainer>
        </Messages>
      ) : (
        <LoaderContainer>
          <DiscordLoadingDots />
          <div className="lastMessage" ref={(el) => (messagesEnd = el)} />
        </LoaderContainer>
      )}

      <form onSubmit={handleSendMessage}>
        <InputContainer>
          <InputWrapper>
            <Input
              value={currentMessage}
              onChange={onChange}
              type="text"
              placeholder={`Message @${channelName || 'Undetermined'}`}
            />
            <InputIcon />
          </InputWrapper>
        </InputContainer>
      </form>
    </Container>
  );
};

export default ChannelData;
