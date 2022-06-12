import React, { useEffect, FormEvent } from 'react';
import { LoaderContainer } from 'src/components/Friends/styles';
import { DiscordLoadingDots } from 'src/components/LoadingSpinner';
import { useWS } from 'src/contexts/ws.context';
import useFetchAndLoad from 'src/hooks/useFetchAndLoad';
import { useAppDispatch, useAppSelector } from 'src/redux/hooks';
import { selectActiveChannel } from 'src/redux/states/ui';
import { MessageService } from 'src/services/message.service';
import { dateFormatted } from 'src/utils/date';
import { useChatInputValue } from 'src/hooks/useChatInputValue';
import ChannelMessage from '../ChannelMessage';
import {
  addMessage,
  fetchMessages,
  isLoadingMessages,
  selectMessages
} from 'src/redux/states/messages';
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
  channelName: string | null;
}

const ChannelData: React.FC<Props> = ({ channelName }) => {
  const { value: currentMessage, onChange, setValue } = useChatInputValue('');
  const messages = useAppSelector(selectMessages);
  const isLoading = useAppSelector(isLoadingMessages);
  const dispatch = useAppDispatch();
  const { callEndpoint } = useFetchAndLoad();
  const activeChannel = useAppSelector(selectActiveChannel);
  const ws = useWS();
  let messagesEnd: any;

  useEffect(() => {
    if (isLoading === 'idle') {
      dispatch(fetchMessages(activeChannel));
    }
  }, [activeChannel]);

  useEffect(() => {
    const scrollToBottom = () => {
      messagesEnd.scrollIntoView();
    };
    scrollToBottom();
  }, [messagesEnd, messages, activeChannel]);

  useEffect(() => {
    ws.on('MESSAGE_CREATE', (newMessage, id) => {
      if (activeChannel !== id) return;
      dispatch(addMessage(newMessage));
    });

    return () => {
      ws.off('MESSAGE_CREATE');
    };
  }, [ws, activeChannel]);

  const handleSendMessage = async (e: FormEvent) => {
    e.preventDefault();
    const messageData = {
      roomId: activeChannel,
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
