import React, { useEffect } from 'react';
import { LoaderContainer } from 'src/components/Friends/styles';
import { DiscordLoadingDots } from 'src/components/LoadingSpinner';
import { useAppDispatch, useAppSelector } from 'src/redux/hooks';
import { selectActiveChannel } from 'src/redux/states/ui';
import ChannelMessage from '../ChannelMessage';
import {
  fetchMessages,
  isLoadingMessages,
  selectMessages
} from 'src/redux/states/messages';
import { Container, Messages, MessagesContainer } from './styles';
import { selectChannelName } from 'src/redux/states/channels';
import { MessageInput } from '../channel-input';

const ChannelData: React.FC = () => {
  const messages = useAppSelector(selectMessages);
  const isLoading = useAppSelector(isLoadingMessages);
  const dispatch = useAppDispatch();
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
      <MessageInput
        activeChannel={activeChannel}
        placeholder={`Message @${channelName}`}
      />
    </Container>
  );
};

export default ChannelData;
