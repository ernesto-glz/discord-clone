import React from 'react';
import { FriendListItem } from './FriendListItem';
import { getFriendUsers } from 'src/redux/states/users';
import { useAppSelector } from 'src/redux/hooks';
import { Image } from '../elements/Image';

interface Props {
  justOnline?: boolean;
}

export const FriendsList: React.FC<Props> = ({ justOnline }) => {
  const friends = useAppSelector(getFriendUsers());
  const onlineFriends = friends.filter((f) => f.status === 'ONLINE');
  const users = justOnline ? onlineFriends : friends;

  if (users.length) {
    return (
      <div className="friends-panel flex-column">
        <h2 className="list-title">
          {justOnline ? 'ONLINE' : 'ALL FRIENDS'} - {users.length}
        </h2>
        <ul className="list-body scrollerBase scroller">
          {users.map((user) => (
            <FriendListItem key={user.id} friend={user} />
          ))}
        </ul>
      </div>
    );
  }

  return (
    <React.Fragment>
      {justOnline ? (
        <div className="friends-panel center">
          <Image className="wampus-image" src="/img/wampus/wampus_sleeping.svg" />
          <p className="wampus-message">No one's around to play with Wumpus.</p>
        </div>
      ) : (
        <div className="friends-panel center">
          <Image className="wampus-image" src="/img/wampus/wampus_king.svg" />
          <p className="wampus-message">No friends, only Wampus.</p>
        </div>
      )}
    </React.Fragment>
  );
};
