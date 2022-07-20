import React, { FormEvent, useEffect, useState } from 'react';
import { useInputValue } from 'src/hooks/useInputValue';
import { useAppDispatch } from 'src/redux/hooks';
import { createRequest } from 'src/redux/states/requests';
import events from 'src/services/event-service';
import {
  Container,
  FlexColumnContainer,
  WampusImage,
  WampusMessage,
  FriendHeader,
  HeaderContainer,
  InputHeader
} from '../styles';

interface Response {
  message: string | null;
  type: 'Success' | 'Error' | null;
}

export interface AddInputProps {
  focus: boolean;
  state: Response;
}

export const AddFriend: React.FC = () => {
  const [response, setResponse] = useState<Response>({ message: null, type: null });
  const [focused, setFocused] = useState(false);
  const target = useInputValue('');
  const dispatch = useAppDispatch();

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!target.value.includes('#')) {
      return setResponse({
        message: `We need asd's four digit tag so we know wich one they are.`,
        type: 'Error'
      });
    }

    const splitted = target.value.split('#');

    if (splitted[1].length < 4 || splitted[1].length > 4) {
      return setResponse({ message: 'Invalid four digit tag.', type: 'Error' });
    }

    const payload = { username: splitted[0], discriminator: splitted[1] };
    dispatch(createRequest(payload));
  };

  useEffect(() => {
    events.on('REQUEST_CREATE_SUCCEEDED', (message) => {
      setResponse({  message,  type: 'Success' });
    });
    events.on('REQUEST_CREATE_FAILED', (message) => {
      setResponse({ message, type: 'Error' });
    });

    return () => {
      events.off('REQUEST_CREATE_SUCCEEDED', () => {});
      events.off('REQUEST_CREATE_FAILED', () => {});
    };
  }, []);

  return (
    <FlexColumnContainer>
      <FriendHeader>
        <h2>Add Friend</h2>
        <form onSubmit={onSubmit} autoComplete="off">
          <div className={response.type ?? ''}>
            {!response.message
              ? "You can add a friend with their Discord Tag. It's cAsE sEnSitIvE!"
              : response.message}
          </div>
          <HeaderContainer state={response} focus={focused}>
            <div className="inputWrapper">
              <InputHeader
                type="text"
                maxLength={40}
                {...target}
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
