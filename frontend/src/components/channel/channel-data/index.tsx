import React, { useEffect, useRef } from 'react';
import ChannelMessage from '../channel-message';
import { fetchMessages, getChannelMessages } from 'src/redux/states/messages';
import { MessageInput } from '../channel-input';
import { ChannelWelcome } from '../channel-welcome';
import { MessageDivider } from 'src/components/message-divider';
import SkeletonMessage from '../channel-message/skeleton-message';
import {
  Container,
  Messages,
  MessagesContainer,
  MessagesWrapper
} from './styles';
import { useAppDispatch, useAppSelector } from 'src/redux/hooks';

const ChannelData: React.FC = () => {
  const { page, totalPages } = useAppSelector((s) => s.messages);
  const activeChannel = useAppSelector((s) => s.ui.activeChannel)!;
  const messages = useAppSelector(getChannelMessages(activeChannel!._id));
  const messagesRef = useRef<HTMLDivElement>(null);
  const skeletonRef = useRef<HTMLDivElement>(null);
  const lastMessageRef = useRef<HTMLDivElement>(null);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const messageInput = document.querySelector('#messageInput') as HTMLDivElement;
    messageInput.focus();

    dispatch(fetchMessages({ channelId: activeChannel._id }));
  }, [activeChannel]);

  useEffect(() => {
    lastMessageRef.current!.scrollIntoView();
  }, [messages[messages.length - 1], activeChannel]);

  useEffect(() => {
    const myInput = document.querySelector('#messageInput');
    const resizeObserver = new ResizeObserver(() => {
      messagesRef.current!.scroll({ top: messagesRef.current?.scrollHeight });
    });

    resizeObserver.observe(myInput as HTMLDivElement);

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  const LoadingIndicator: React.FC = () => (
    <div ref={skeletonRef}>
      {page! < totalPages! || !page
        ? new Array(30).fill(0).map((_, i) => <SkeletonMessage key={i} />)
        : null}
    </div>
  );

  const SkeletonLoader: React.FC = () => (
    <div>
      {new Array(30).fill(0).map((_, i) => (
        <SkeletonMessage key={i} />
      ))}
    </div>
  );

  const onScroll = () => {
    if (
      !skeletonRef.current ||
      messagesRef.current!.scrollTop > skeletonRef.current!.scrollHeight ||
      !page ||
      !totalPages ||
      page >= totalPages
    )
      return;
    dispatch(fetchMessages({ channelId: activeChannel._id, page: page + 1 }));
    messagesRef.current!.scroll({
      top: skeletonRef.current!.scrollHeight + 1000
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
                    activeChannel.avatar!
                  }.png`}
                  username={activeChannel.name!}
                />
                {messages.length ? (
                  <React.Fragment>
                    <MessageDivider date={messages[0].updatedAt!} />
                  </React.Fragment>
                ) : null}
                <LoadingIndicator />
                {messages.map((msg: any, index: number) => (
                  <ChannelMessage message={msg} key={index} />
                ))}
                <div className="lastMessage" ref={lastMessageRef} />
              </Messages>
            </MessagesContainer>
          ) : (
            <MessagesContainer>
              <Messages>
                <SkeletonLoader />
                <div className="lastMessage" ref={lastMessageRef} />
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
