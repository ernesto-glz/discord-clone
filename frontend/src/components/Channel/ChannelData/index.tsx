import React, { useEffect, FormEvent } from 'react';
import { LoaderContainer } from 'src/components/Friends/styles';
import { DiscordLoadingDots } from 'src/components/LoadingSpinner';
import useFetchAndLoad from 'src/hooks/useFetchAndLoad';
import { useAppDispatch, useAppSelector } from 'src/redux/hooks';
import { selectActiveChannel } from 'src/redux/states/ui';
import { MessageService } from 'src/services/message.service';
import { dateFormatted } from 'src/utils/date';
import { useChatInputValue } from 'src/hooks/useChatInputValue';
import ChannelMessage from '../ChannelMessage';
import {
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
import { selectChannelName } from 'src/redux/states/channels';
import { ws } from 'src/contexts/ws.context';

const ChannelData: React.FC = () => {
  const { value: currentMessage, onChange, setValue } = useChatInputValue('');
  const messages = useAppSelector(selectMessages);
  const isLoading = useAppSelector(isLoadingMessages);
  const dispatch = useAppDispatch();
  const { callEndpoint } = useFetchAndLoad();
  const activeChannel = useAppSelector(selectActiveChannel);
  const channelName = useAppSelector(selectChannelName);
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

  const handleSendMessage = async (e: FormEvent) => {
    e.preventDefault();
    const messageData = {
      channelId: activeChannel,
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
              <ChannelMessage key={i} message={msg} />
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
