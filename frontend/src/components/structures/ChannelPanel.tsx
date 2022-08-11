import React, { useEffect, useMemo, useRef } from 'react';
import { fetchMessages, getChannelMessages } from 'src/redux/states/messages';
import { MessageBox } from '../views/MessageBox/MessageBox';
import { DMChannelWelcome } from '../views/channel/DMChannelWelcome';
import { useAppDispatch, useAppSelector } from 'src/redux/hooks';
import { Entity } from '@discord/types';
import { ScrollPanel } from 'src/components/structures/ScrollPanel';
import { getAvatarUrl } from 'src/utils/utils';
import { SkeletonLoader } from './SkeletonLoader';
import Message from '../views/messages/Message';
import { useStopEditing } from 'src/hooks/channel/useStopEditing';

const ChannelPanel: React.FC = () => {
  const scrollbarRef = useRef<HTMLDivElement>(null);
  const firstMessageRef = useRef<HTMLLIElement>(null);
  const loaderRef = useRef<HTMLDivElement>(null);
  const channel = useAppSelector((s) => s.ui.activeChannel)!;
  const msgCount = useAppSelector((s) => s.messages.total[channel.id]);
  const messages = useAppSelector(getChannelMessages(channel.id));
  const loadedAllMessages = useMemo(() => messages.length >= msgCount, [messages]);
  const dispatch = useAppDispatch();
  const {} = useStopEditing();

  useEffect(() => {
    dispatch(fetchMessages({ channelId: channel.id, back: 40 }));
  }, [channel.id]);

  const onScroll = () => {
    if (messages.length === msgCount) return;
    dispatch(fetchMessages({ channelId: channel.id, back: messages.length + 40 }));
  };

  return (
    <div className='channel-panel'>
      <ScrollPanel
        stickyBottom
        wrappedRef={scrollbarRef}
        loaderRef={loaderRef}
        firstMsgRef={firstMessageRef}
        onScroll={onScroll}
      >
        {loadedAllMessages && (
          <DMChannelWelcome imageUrl={getAvatarUrl(channel)} username={channel.name!} />
        )}
        {!loadedAllMessages && (
          <SkeletonLoader wrappedRef={loaderRef} />
        )}
        {messages.map((msg: Entity.Message) => {
          const index = messages.findIndex((m) => m.id === msg.id);
          const prevMessage = messages[index - 1];
          const firstMessage = messages[0];

          if (messages.length <= 40 && msg.id === firstMessage.id)
            return (
              <Message message={msg} key={msg.id} wrappedRef={firstMessageRef} />
            )
          else if (prevMessage && messages.length > 40 && messages[39]?.id === msg.id)
            return (
              <Message message={msg} key={msg.id} wrappedRef={firstMessageRef} />
            )

          return <Message message={msg} key={msg.id} />;
        })}
        <div className="divider" />
      </ScrollPanel>

      <MessageBox scrollbarRef={scrollbarRef} />
    </div>
  );
};

export default ChannelPanel;
