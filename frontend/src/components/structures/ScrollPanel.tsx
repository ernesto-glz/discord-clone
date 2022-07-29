import { UIEventHandler, useEffect, useRef, useState } from 'react';
import { useAppSelector } from 'src/redux/hooks';
import { getChannelMessages } from 'src/redux/states/messages';
import { Messages, MessagesContainer, MessagesWrapper } from '../channel/channel-panel/styles';

export interface Props {
  /* stickyBottom: if set to true, then once the user hits the bottom of
   * the list, any new children added to the list will cause the list to
   * scroll down to show the new element, rather than preserving the
   * existing view.
   */
  stickyBottom?: boolean;

  /* startAtBottom: if set to true, the view is assumed to start
   * scrolled to the bottom.
   */
  startAtBottom?: boolean;

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
  startAtBottom = true,
  onScroll = () => {},
  wrappedRef,
  firstMsgRef,
  loaderRef,
  children
}) => {
  const [isFilling, setIsFilling] = useState(false);
  const itemList = useRef<HTMLOListElement>(null);
  const channel = useAppSelector((s) => s.ui.activeChannel)!;
  const messages = useAppSelector(getChannelMessages(channel.id));

  const handleScroll = async (ev: React.UIEvent<HTMLDivElement>) => {
    const loader = loaderRef.current;
    if (!loader || isFilling || wrappedRef.current!.scrollTop > loader.scrollHeight) 
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
    if (startAtBottom || stickyBottom)
      scrollToBottom();
  }, [messages[messages.length - 1], channel.id]);

  return (
    <MessagesWrapper>
      <section ref={wrappedRef} onScroll={handleScroll} className="scrollerBase scroller messages">
        <MessagesContainer>
          <Messages ref={itemList}>{children}</Messages>
        </MessagesContainer>
      </section>
    </MessagesWrapper>
  );
};
