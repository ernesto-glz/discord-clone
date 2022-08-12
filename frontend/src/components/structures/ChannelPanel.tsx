import React, { useEffect, useRef } from 'react';
import { fetchMessages, getChannelMessages } from 'src/redux/states/messages';
import { MessageBox } from '../views/MessageBox/MessageBox';
import { useAppDispatch, useAppSelector } from 'src/redux/hooks';
import { Entity } from '@discord/types';
import { ScrollPanel } from 'src/components/structures/ScrollPanel';
import Message from '../views/messages/Message';
import { useStopEditing } from 'src/hooks/channel/useStopEditing';

const ChannelPanel: React.FC = () => {
  const scrollbarRef = useRef<HTMLDivElement>(null);
  const channel = useAppSelector((s) => s.ui.activeChannel)!;
  const messages = useAppSelector(getChannelMessages(channel.id));
  const dispatch = useAppDispatch();
  const {} = useStopEditing();

  useEffect(() => {
    dispatch(fetchMessages({ channelId: channel.id, back: 40 }));
  }, [channel.id]);

  const fetchMore = () => {
    dispatch(fetchMessages({ channelId: channel.id, back: messages.length + 40 }));
  };

  return (
    <div className="channel-panel">
      <ScrollPanel wrappedRef={scrollbarRef} fetchMore={fetchMore}>
        {messages.map((msg: Entity.Message) => (
          <Message message={msg} key={msg.id} />
        ))}
        <div className="divider" />
      </ScrollPanel>

      <MessageBox scrollbarRef={scrollbarRef} />
    </div>
  );
};

export default ChannelPanel;
