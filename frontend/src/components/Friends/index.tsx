import React from 'react';
import { Pages } from '../Layout';
import { AddFriend } from './AddFriend';
import { MyFriends } from './friends';
import { PendingRequests } from './Pending';

interface Props {
  page: Pages;
}

const FriendsPage: React.FC<Props> = ({ page }) => {
  if (page === 'Online') {
    return <MyFriends justOnline />;
  }

  if (page === 'All') {
    return <MyFriends />;
  }

  if (page === 'Pending') {
    return <PendingRequests />;
  }

  return <AddFriend />;
};

export default FriendsPage;
