import React from 'react';
import { Pages } from '../Layout';
import { AddFriend } from './AddFriend';
import { AllFriends } from './All';
import { OnlineFriends } from './Online';
import { PendingRequests } from './Pending';

interface Props {
  page: Pages;
}

const FriendsPage: React.FC<Props> = ({ page }) => {
  if (page === 'Online') {
    return <OnlineFriends />;
  }

  if (page === 'Pending') {
    return <PendingRequests />;
  }

  if (page === 'All') {
    return <AllFriends />;
  }

  return <AddFriend />;
};

export default FriendsPage;
