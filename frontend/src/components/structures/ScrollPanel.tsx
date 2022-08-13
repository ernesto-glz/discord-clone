import React, { useEffect } from 'react';
import { useAppSelector } from 'src/redux/hooks';
import { getChannelMessages } from 'src/redux/states/messages';
import { DMChannelWelcome } from '../views/channel/DMChannelWelcome';
import { getAvatarUrl } from 'src/utils/utils';
import { ChannelMessagesLoader } from '../views/channel/ChannelMessagesLoader';
import InfiniteScroll from './InfiniteScroll';

export interface Props extends React.ComponentProps<'div'> {
  wrappedRef: React.RefObject<any>;
  fetchMore: () => void;
  children: React.ReactNode;
}

const alignBottom = {
  overflow: 'hidden',
  display: 'flex',
  flexDirection: 'column-reverse',
} as React.CSSProperties;

export const ScrollPanel: React.FC<Props> = (props) => {
  const { fetchMore, children, wrappedRef } = props;
  const channel = useAppSelector((s) => s.ui.activeChannel)!;
  const messages = useAppSelector(getChannelMessages(channel.id));
  const msgCount = useAppSelector((s) => s.messages.total[channel.id]);
  const loadedAllMessages = messages.length >= msgCount;
  const scrollPosition = useAppSelector((s) => s.ui.lastScrollbarPos[channel.id]);

  useEffect(() => {
    if (!scrollPosition) return;
    wrappedRef.current.scrollTo(0, scrollPosition);
  }, [channel.id]);

  return (
    <div className="messages-wrapper">
      <div
        ref={wrappedRef}
        id="channelScroller"
        className="scrollerBase scroller messages"
      >
        <InfiniteScroll
          dataLength={messages.length}
          inverse={true}
          next={() => fetchMore()}
          hasMore={!loadedAllMessages}
          loader={<ChannelMessagesLoader messages={messages} />}
          style={alignBottom}
          scrollableTarget="channelScroller"
          endMessage={
            <DMChannelWelcome
              imageUrl={getAvatarUrl(channel)}
              username={channel.name!}
            />
          }
        >
          <ol className="messages-list">{children}</ol>
        </InfiniteScroll>
      </div>
    </div>
  );
};
