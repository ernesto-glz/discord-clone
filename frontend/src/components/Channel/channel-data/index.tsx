import React, { useEffect, useMemo, useRef, useState } from 'react';
import { LoaderContainer } from 'src/components/friends/styles';
import { DiscordLoadingDots } from 'src/components/loading-spinner';
import { useAppDispatch, useAppSelector } from 'src/redux/hooks';
import { selectActiveChannel } from 'src/redux/states/ui';
import ChannelMessage from '../channel-message';
import { fetchMessages, isLoadingMessages } from 'src/redux/states/messages';
import {
  Container,
  Messages,
  MessagesContainer,
  MessagesWrapper
} from './styles';
import { selectChannel } from 'src/redux/states/channels';
import { MessageInput } from '../channel-input';
import { ChannelWelcome } from '../channel-welcome';
import { MessageDivider } from 'src/components/message-divider';

const ChannelData: React.FC = () => {
  const messages = useAppSelector((s) => s.messages.entities);
  const isLoading = useAppSelector(isLoadingMessages);
  const activeChannel = useAppSelector(selectActiveChannel);
  const channel = useAppSelector(selectChannel(activeChannel));
  const lastMessageRef = useRef<HTMLDivElement>(null);
  const messagesRef = useRef<HTMLDivElement>(null);
  const [scrollPosition, setScrollPosition] = useState<number>(0);
  const dispatch = useAppDispatch();

  const scrollToBottom = () => {
    lastMessageRef.current?.scrollIntoView();
  };

  const resizeObserver = useMemo(() => {
    return new ResizeObserver(() => {
      if (scrollPosition === 0) scrollToBottom();
    });
  }, [scrollPosition]);

  useEffect(() => {
    const messageInput = document.querySelector(
      '#messageInput'
    ) as HTMLDivElement;
    messageInput.focus();
    if (isLoading === 'idle') dispatch(fetchMessages(activeChannel));
  }, [activeChannel]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    const myInput = document.querySelector('#messageInput');
    resizeObserver.observe(myInput as HTMLDivElement);

    messagesRef.current?.addEventListener('scroll', (e) => {
      const element = messagesRef.current;
      const currentPos =
        element!.scrollHeight - element!.scrollTop - element!.clientHeight;

      if (scrollPosition > 0 && currentPos === 0) setScrollPosition(currentPos);
      else if (scrollPosition === 0 && currentPos !== 0)
        setScrollPosition(currentPos);
    });

    return () => {
      resizeObserver.disconnect();
      messagesRef.current?.removeEventListener('scroll', () => {});
    };
  }, [scrollPosition, resizeObserver]);

  return (
    <Container>
      <MessagesWrapper>
        <section ref={messagesRef} className="scrollerBase scroller messages">
          {isLoading !== 'loading' ? (
            <MessagesContainer>
              <Messages>
                <ChannelWelcome
                  imageUrl={`${process.env.REACT_APP_API_ROOT}/assets/avatars/${
                    channel.dmUser!.avatar
                  }.png`}
                  username={channel.name}
                />
                {messages.length > 0 && (
                  <MessageDivider date={messages[0].updatedAt!} />
                )}
                {messages.map((msg: any, i: number) => (
                  <ChannelMessage key={i} message={msg} />
                ))}
                <div className="lastMessage" ref={lastMessageRef} />
              </Messages>
            </MessagesContainer>
          ) : (
            <React.Fragment>
              <DiscordLoadingDots />
            </React.Fragment>
          )}
        </section>
      </MessagesWrapper>

      <MessageInput
        activeChannel={activeChannel}
        placeholder={`Message @${channel.name}`}
      />
    </Container>
  );
};

export default ChannelData;
