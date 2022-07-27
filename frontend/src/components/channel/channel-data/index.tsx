import React, { useEffect, useRef } from 'react';
import ChannelMessage from '../channel-message';
import { fetchMessages, getChannelMessages } from 'src/redux/states/messages';
import { MessageInput } from '../channel-input';
import { ChannelWelcome } from '../channel-welcome';
import { MessageDivider } from 'src/components/message-divider';
import SkeletonMessage from '../channel-message/skeleton-message';
import { useAppDispatch, useAppSelector } from 'src/redux/hooks';
import {
  Container,
  Messages,
  MessagesContainer,
  MessagesWrapper
} from './styles';

const ChannelData: React.FC = () => {
  const { total } = useAppSelector((s) => s.messages);
  const activeChannel = useAppSelector((s) => s.ui.activeChannel)!;
  const messages = useAppSelector(getChannelMessages(activeChannel.id));
  const messagesRef = useRef<HTMLDivElement>(null);
  const msgCount = useAppSelector((s) => s.messages.total[activeChannel.id]);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const messageInput = document.querySelector('#messageInput') as HTMLDivElement;
    messageInput.focus();

    dispatch(fetchMessages({ channelId: activeChannel.id, back: 30 }));
  }, [activeChannel]);

  useEffect(() => {
    messagesRef.current!.scrollTo({ top: messagesRef.current!.scrollHeight });
  }, [messages[messages.length - 1], activeChannel]);

  useEffect(() => {
    const chatInput = document.querySelector('#messageInput');
    const resizeObserver = new ResizeObserver(() => {
      messagesRef.current!.scroll({ top: messagesRef.current?.scrollHeight });
    });

    resizeObserver.observe(chatInput as HTMLDivElement);

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  const SkeletonLoader: React.FC = () => (
    <div>
      {new Array(30).fill(0).map((_, i) => (
        <SkeletonMessage key={i} />
      ))}
    </div>
  );

  const onScroll = () => {
    if (messages.length ===  msgCount || messagesRef.current!.scrollTop > 300)
      return;

    dispatch(fetchMessages({ channelId: activeChannel.id, back: messages.length + 30 }));
    messagesRef.current!.scroll({
      top: messagesRef.current!.scrollHeight + 300
    });
  };

  return (
    <Container>
      <MessagesWrapper>
        <section
          ref={messagesRef}
          onScroll={onScroll}
          className="scrollerBase scroller messages"
        >
          {messages ? (
            <MessagesContainer>
              <Messages>
                <ChannelWelcome
                  imageUrl={`${process.env.REACT_APP_API_ROOT}/assets/avatars/${
                    activeChannel.avatar
                  }.png`}
                  username={activeChannel.name!}
                />
                {messages.length ? (
                  <React.Fragment>
                    <MessageDivider date={messages[0].updatedAt!} />
                  </React.Fragment>
                ) : null}
                {messages.map((msg: any, index: number) => (
                  <ChannelMessage message={msg} key={index} />
                ))}
                <div className="divider" />
              </Messages>
            </MessagesContainer>
          ) : (
            <MessagesContainer>
              <Messages>
                <SkeletonLoader />
              </Messages>
            </MessagesContainer>
          )}
        </section>
      </MessagesWrapper>

      <MessageInput
        activeChannel={activeChannel}
        placeholder={`Message @${activeChannel.name!}`}
      />
    </Container>
  );
};

export default ChannelData;
