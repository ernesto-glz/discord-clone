import classNames from 'classnames';
import React, { useState } from 'react';
import { AddFriendInput } from 'src/components/UI/input/add-friend-input';
import { Result, useAddFriend } from 'src/hooks/friends/useAddFriend';
import {
  Container,
  FlexColumnContainer,
  WampusImage,
  WampusMessage,
  FriendHeader,
  HeaderContainer,
  AddFriendResponse,
} from '../styles';

export interface AddInputProps {
  focus: boolean;
  state: Result;
}

export const AddFriend: React.FC = () => {
  const { onSubmit, register, result, resetStatus } = useAddFriend();
  const [focused, setFocused] = useState(false);

  return (
    <FlexColumnContainer>
      <FriendHeader>
        <h2>Add Friend</h2>
        <form onSubmit={onSubmit} autoComplete="off">
          <div>
            You can add a friend with their Discord Tag. It's cAsE sEnSitIvE!
          </div>
          <HeaderContainer state={result} focus={focused}>
            <div className="inputWrapper">
              <AddFriendInput
                type="text"
                maxLength={40}
                {...register('target')}
                autoFocus
                onFocus={() => setFocused(true)}
                onBlur={() => setFocused(false)}
                placeholder="Enter a Username#0000"
                onChange={resetStatus}
              />
            </div>
            <button type="submit">
              <div>Send Friend Request</div>
            </button>
          </HeaderContainer>
          <AddFriendResponse
            className={classNames(result.type, {
              displayed: !!result.message,
            })}
          >
            {result.message}
          </AddFriendResponse>
        </form>
      </FriendHeader>
      <Container>
        <WampusImage
          src={`${ASSETS_PATH}/wampus/wampus_king.svg`}
          alt="add friend"
        />
        <WampusMessage>
          Wumpus is waiting on friends. You don’t have to though!
        </WampusMessage>
      </Container>
    </FlexColumnContainer>
  );
};
