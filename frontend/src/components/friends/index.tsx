import React from 'react';
import { AddFriend } from './add-friend';
import { MyFriends } from './friends';
import { PendingRequests } from './friend-request';
import { Pages } from 'src/pages/friends-page';

interface Props {
  page: Pages;
}

const FriendsPageWrapper: React.FC<Props> = ({ page }) => {
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

export default FriendsPageWrapper;
