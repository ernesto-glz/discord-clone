import classNames from 'classnames';
import React, { useState } from 'react';
import { AddFriendInput } from './AddFriendInput';
import { Result, useAddFriend } from 'src/hooks/friends/useAddFriend';

export interface AddInputProps {
  focus: boolean;
  state: Result;
}

export const AddFriend: React.FC = () => {
  const { onSubmit, register, result, resetStatus } = useAddFriend();
  const [focused, setFocused] = useState(false);

  return (
    <div className="friends-panel">
      <div className="add-friend">
        <h2 className="title">Add Friend</h2>
        <form
          className="add-friend-form"
          onSubmit={onSubmit}
          autoComplete="off"
        >
          <p className="advertise">
            You can add a friend with their Discord Tag. It's cAsE sEnSitIvE!
          </p>
          <div
            className="input-container"
            data-status={result.type}
            data-focused={focused}
          >
            <div className="inputWrapper">
              <AddFriendInput
                maxLength={40}
                {...register('target')}
                autoFocus
                onFocus={() => setFocused(true)}
                onBlur={() => setFocused(false)}
                placeholder="Enter a Username#0000"
                onKeyDown={resetStatus}
              />
            </div>
            <button className="button send" type="submit">
              Send Friend Request
            </button>
          </div>
          <div
            className={classNames('response', result.type, {
              displayed: !!result.message,
            })}
          >
            {result.message}
          </div>
        </form>
      </div>
      <div className="friends-panel center">
        <img
          className="wampus-image"
          src={`${ASSETS_PATH}img/wampus/wampus_king.svg`}
        />
        <p className="wampus-message">
          Wumpus is waiting on friends. You don't have to though!
        </p>
      </div>
    </div>
  );
};
