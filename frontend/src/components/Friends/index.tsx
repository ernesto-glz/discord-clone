import React from 'react';
import { Pages } from 'src/pages/channels/me';
import { AddFriend } from './add-friend';
import { MyFriends } from './friends';
import { PendingRequests } from './friend-request';

interface Props {
  page: Pages;
}

const FriendsPage: React.FC<Props> = ({ page }) => {
  if (page === 'ONLINE') {
    return <MyFriends justOnline />;
  }

  if (page === 'ALL') {
    return <MyFriends />;
  }

  if (page === 'PENDING') {
    return <PendingRequests />;
  }

  return <AddFriend />;
};

export default FriendsPage;
