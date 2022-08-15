import React from 'react';
import { AddFriend } from '../views/friends/AddFriend';
import { FriendsList } from '../views/friends/FriendsList';
import { PendingRequests } from '../views/friends/PendingRequests';
import { useAppSelector } from 'src/store/hooks';

const FriendsPanel: React.FC = () => {
  const section = useAppSelector((s) => s.ui.friendsSection);

  switch (section) {
    case 'ONLINE':
      return <FriendsList justOnline />;
    case 'ALL':
      return <FriendsList />;
    case 'PENDING':
      return <PendingRequests />;
    case 'ADD':
      return <AddFriend />;
    default:
      return <h1>Unknown Section</h1>;
  }
};

export default FriendsPanel;
