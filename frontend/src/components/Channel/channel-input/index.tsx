import React, { FormEvent } from 'react';
import { useChatInputValue } from 'src/hooks/useChatInputValue';
import useFetchAndLoad from 'src/hooks/useFetchAndLoad';
import { MessageService } from 'src/services/message.service';
import {
  InputContainer,
  InputWrapper,
  Input,
  InputIcon
} from '../ChannelData/styles';
import striptags from 'striptags';
import { ws } from 'src/ws/websocket';

interface Props {
  placeholder: string;
  activeChannel: string;
}

export const MessageInput: React.FC<Props> = (props) => {
  const { value: currentMessage, onChange, setValue } = useChatInputValue('');
  const { callEndpoint } = useFetchAndLoad();

  const handleSendMessage = async (e: FormEvent) => {
    e.preventDefault();
    const messageData = {
      channelId: props.activeChannel,
      content: striptags(currentMessage, 'a')
    };

    const { data } = await callEndpoint(
      MessageService.createMessage(messageData)
    );

    ws.emit('MESSAGE_CREATE', data);
    setValue('');
  };

  return (
    <form onSubmit={handleSendMessage}>
      <InputContainer>
        <InputWrapper>
          <Input
            value={currentMessage}
            onChange={onChange}
            type="text"
            placeholder={props.placeholder ?? 'Unknown'}
          />
          <InputIcon />
        </InputWrapper>
      </InputContainer>
    </form>
  );
};
