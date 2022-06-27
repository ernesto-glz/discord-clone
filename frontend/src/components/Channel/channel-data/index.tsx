import React, { useEffect } from 'react';
import { LoaderContainer } from 'src/components/friends/styles';
import { DiscordLoadingDots } from 'src/components/loading-spinner';
import { useAppDispatch, useAppSelector } from 'src/redux/hooks';
import { selectActiveChannel } from 'src/redux/states/ui';
import ChannelMessage from '../channel-message';
import { fetchMessages, isLoadingMessages } from 'src/redux/states/messages';
import { Container, Messages, MessagesContainer } from './styles';
import { selectChannelName } from 'src/redux/states/channels';
import { MessageInput } from '../channel-input';

const ChannelData: React.FC = () => {
  const messages = useAppSelector((s) => s.messages.entities);
  const isLoading = useAppSelector(isLoadingMessages);
  const activeChannel = useAppSelector(selectActiveChannel);
  const channelName = useAppSelector(selectChannelName);
  const dispatch = useAppDispatch();
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
