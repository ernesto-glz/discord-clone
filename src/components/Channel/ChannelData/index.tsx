import React, { useEffect, useState, FormEvent } from 'react';
import { LoaderContainer } from 'src/components/Friends/styles';
import { DiscordLoadingDots } from 'src/components/LoadingSpinner';
import { useWS } from 'src/contexts/ws.context';
import useFetchAndLoad from 'src/hooks/useFetchAndLoad';
import { MessageService } from 'src/services/message.service';
import { compareDates, dateFormatted } from 'src/utils/date';
import { useChatInputValue } from '../../../hooks/useChatInputValue';
import ChannelMessage from '../ChannelMessage';

import {
  Container,
  Messages,
  InputContainer,
  InputWrapper,
  Input,
  InputIcon,
  MessagesContainer
} from './styles';

interface Props {
  channelId: string;
  channelName: string | null;
}

const ChannelData: React.FC<Props> = ({ channelId, channelName }) => {
  const { value: currentMessage, onChange, setValue } = useChatInputValue('');
  const [messages, setMessages] = useState<any>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { callEndpoint } = useFetchAndLoad();
  const ws = useWS();
  let messagesEnd: any;

  useEffect(() => {
    const scrollToBottom = () => {
      messagesEnd.scrollIntoView();
    };
    scrollToBottom();
  }, [messagesEnd, messages, channelId]);

  const getAllMessages = async () => {
    setMessages([]);
    setIsLoading(true);
    const { data } = await callEndpoint(
      MessageService.getAllMessages(channelId)
    );

    if (data?.docs?.length) {
      let lastMessage: any = null;

      const messagesFound = data.docs.reverse().map((message: any) => {
        let result: any;

        if (
          lastMessage &&
          lastMessage.sender._id === message.sender._id &&
          compareDates(lastMessage.createdAt, message.createdAt)
        ) {
          result = { ...message, stackMessage: true };
        } else {
          result = { ...message };
        }

        lastMessage = message;
        return result;
      });
      setMessages(messagesFound);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    getAllMessages();
  }, [channelId]);

  useEffect(() => {
    ws.on('message', (msg) => {
      setMessages((msgs: any) => {
        const lastMessage = msgs[msgs.length - 1];
        if (
          lastMessage &&
          lastMessage.sender._id === msg.sender._id &&
          compareDates(lastMessage.createdAt, msg.createdAt)
        ) {
          return [...msgs, { ...msg, stackMessage: true }];
        }
        return [...msgs, { ...msg }];
      });
    });

    return () => {
      ws.off('message');
    };
  }, [ws]);

  const handleSendMessage = async (e: FormEvent) => {
    e.preventDefault();
    const messageData = {
      roomId: channelId,
      content: currentMessage
    };

    const { data } = await callEndpoint(
      MessageService.createMessage(messageData)
    );

    ws.emit('message', data);
    setValue('');
  };

  return (
    <Container>
      {!isLoading ? (
        <Messages>
          <MessagesContainer>
            {messages.map((msg: any, i: number) => (
              <ChannelMessage
                key={i}
                author={msg.sender}
                date={dateFormatted(msg.createdAt)}
                content={msg.content}
                stackMessage={msg.stackMessage}
              />
            ))}
          </MessagesContainer>
          <div className="lastMessage" ref={(el) => (messagesEnd = el)} />
        </Messages>
      ) : (
        <LoaderContainer>
          <DiscordLoadingDots />
          <div className="lastMessage" ref={(el) => (messagesEnd = el)} />
        </LoaderContainer>
      )}

      <form onSubmit={handleSendMessage}>
        <InputContainer>
          <InputWrapper>
            <Input
              value={currentMessage}
              onChange={onChange}
              type="text"
              placeholder={`Message @${channelName || 'Undetermined'}`}
            />
            <InputIcon />
          </InputWrapper>
        </InputContainer>
      </form>
    </Container>
  );
};

export default ChannelData;
