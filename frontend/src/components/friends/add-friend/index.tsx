import React, { FormEvent, useState } from 'react';
import { ws } from 'src/ws/websocket';
import { useInputValue } from 'src/hooks/useInputValue';
import {
  Container,
  FlexColumnContainer,
  WampusImage,
  WampusMessage,
  FriendHeader,
  HeaderContainer,
  InputHeader
} from '../styles';
import client from 'src/api/client';
import { useAppDispatch } from 'src/redux/hooks';
import { actions as requests } from 'src/redux/states/requests';

interface ResponseMessage {
  message: string | null;
  type: 'Success' | 'Error' | null;
}

export interface AddInputProps {
  focus: boolean;
  state: ResponseMessage;
}

export const AddFriend: React.FC = () => {
  const [responseMessage, setResponseMessage] = useState<ResponseMessage>({
    message: null,
    type: null
  });
  const [focused, setFocused] = useState(false);
  const userToAdd = useInputValue('');
  const dispatch = useAppDispatch();

  const handleAddFriend = async (e: FormEvent) => {
    e.preventDefault();

    if (!userToAdd.value.includes('#')) {
      return setResponseMessage({
        message: `We need asd's four digit tag so we know wich one they are.`,
        type: 'Error'
      });
    }

    const splitted = userToAdd.value.split('#');

    if (splitted[1].length < 4 || splitted[1].length > 4) {
      return setResponseMessage({
        message: `Invalid four digit tag.`,
        type: 'Error'
      }); 
    }

    const dataToSend = {
      username: splitted[0],
      discriminator: splitted[1]
    };

    try {
      const { data } = await client.post('/requests', dataToSend);

      if (!data) return;

      setResponseMessage({
        message: `Friend request sent to ${userToAdd.value}`,
        type: 'Success'
      });

      dispatch(requests.added({ ...data, type: 'OUTGOING' }));
      ws.emit('FRIEND_REQUEST_CREATE', { request: data });
    } catch (err: any) {
      setResponseMessage({
        message: err?.response?.data || 'Undetermined error',
        type: 'Error'
      });
    }
  };

  return (
    <FlexColumnContainer>
      <FriendHeader>
        <h2>Add Friend</h2>
        <form onSubmit={handleAddFriend} autoComplete="off">
          <div
            className={`${responseMessage.type === 'Error' && 'error'} ${
              responseMessage.type === 'Success' && 'success'
            }`}
          >
            {!responseMessage.message
              ? "You can add a friend with their Discord Tag. It's cAsE sEnSitIvE!"
              : responseMessage.message}
          </div>
          <HeaderContainer state={responseMessage} focus={focused}>
            <div className="inputWrapper">
              <InputHeader
                type="text"
                maxLength={40}
                {...userToAdd}
                autoFocus
                onFocus={() => setFocused(true)}
                onBlur={() => setFocused(false)}
                placeholder="Enter a Username#0000"
              />
            </div>
            <button type="submit">
              <div>Send Friend Request</div>
            </button>
          </HeaderContainer>
        </form>
      </FriendHeader>
      <Container>
        <WampusImage src="/assets/wampus/wampus_king.svg" alt="add friend" />
        <WampusMessage>
          Wumpus is waiting on friends. You don’t have to though!
        </WampusMessage>
      </Container>
    </FlexColumnContainer>
  );
};
