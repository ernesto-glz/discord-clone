import React from 'react';
import { AddFriend } from './add-friend';
import { MyFriends } from './friends';
import { PendingRequests } from './friend-request';
import { Pages } from 'src/pages/guild-page';

interface Props {
  page: Pages;
}

const FriendsPage: React.FC<Props> = ({ page }) => {
  switch (page) {
    case 'ONLINE':
      return <MyFriends justOnline />;
    case 'ALL':
      return <MyFriends />;
    case 'PENDING':
      return <PendingRequests />;
    default:
      return <AddFriend />;
  }
};

export default FriendsPage;
