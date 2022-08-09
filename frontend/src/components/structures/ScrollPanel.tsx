import { UIEventHandler, useEffect, useRef, useState } from 'react';
import { useAppSelector } from 'src/redux/hooks';
import { getChannelMessages } from 'src/redux/states/messages';

export interface Props {
  /* stickyBottom: if set to true, then once the user hits the bottom of
   * the list, any new children added to the list will cause the list to
   * scroll down to show the new element, rather than preserving the
   * existing view.
   */
  stickyBottom?: boolean;

  /* className: classnames to add to the top-level div
   */
  className?: string;

  /* wrappedRef: ref used to handle scrollBar
   */
  wrappedRef: React.RefObject<any>;

  /* firstMsgRef: ref used to handle load messages
   */
  firstMsgRef: React.RefObject<HTMLDivElement>;

  /* firstMsgRef: ref used to track and trigger loadMoreMessages()
   */
  loaderRef: React.RefObject<HTMLDivElement>;

  /* onScroll: a callback which is called whenever any scroll happens.
   */
  onScroll?: UIEventHandler<HTMLDivElement>;

  /* children: the component to be wrapped
   */
  children: React.ReactNode;
}

export const ScrollPanel: React.FC<Props> = ({
  stickyBottom = true,
  onScroll = () => {},
  wrappedRef,
  firstMsgRef,
  loaderRef,
  children,
}) => {
  const [stuckAtBottom, setStuckAtBottom] = useState(false);
  const [isFilling, setIsFilling] = useState(false);
  const itemList = useRef<HTMLOListElement>(null);
  const channel = useAppSelector((s) => s.ui.activeChannel)!;
  const messages = useAppSelector(getChannelMessages(channel.id));

  const isAtBottom = () => {
    const sn = wrappedRef.current!;
    return sn.scrollHeight - (sn.scrollTop + sn.clientHeight) <= 1;
  };

  const handleScroll = async (ev: React.UIEvent<HTMLDivElement>) => {
    const loader = loaderRef.current;

    if (isAtBottom() && stickyBottom && !stuckAtBottom) setStuckAtBottom(true);
    else if (!isAtBottom() && stuckAtBottom) setStuckAtBottom(false);

    if (
      !loader ||
      isFilling ||
      wrappedRef.current!.scrollTop > loader.scrollHeight
    )
      return;

    setIsFilling(true);
    onScroll(ev);
  };

  const scrollToBottom = () => {
    const scroll = wrappedRef.current!;
    scroll.scrollTop = scroll.scrollHeight;
  };

  useEffect(() => {
    firstMsgRef.current?.scrollIntoView({ block: 'center' });
    setIsFilling(false);
  }, [messages[0]]);

  useEffect(() => {
    if (!stuckAtBottom && isAtBottom()) setStuckAtBottom(true);
    if (stickyBottom) scrollToBottom();
  }, [messages[messages.length - 1], channel.id]);

  useEffect(() => {
    events.emit('UPDATE_STUCK_STATE', stuckAtBottom);

    const resizeNotifier = new ResizeObserver(() => {
      if (!stuckAtBottom || !stickyBottom) return;
      scrollToBottom();
    });

    resizeNotifier.observe(wrappedRef.current!);
    return () => {
      resizeNotifier.disconnect();
    };
  }, [stuckAtBottom]);

  return (
    <div className="messages-wrapper">
      <div
        ref={wrappedRef}
        onScroll={handleScroll}
        className="scrollerBase scroller messages"
      >
        <div className="start-from-bottom">
          <ol className="messages-list" ref={itemList}>
            {children}
          </ol>
        </div>
      </div>
    </div>
  );
};
