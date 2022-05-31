import React from 'react';
import { Avatar, Profile, UserData } from 'src/components/UserInfo/styles';
import { PendingRequest } from 'src/models/friend.model';
import { FriendRequest } from '../styles';
import { RequestActionsItem } from './request-actions';

export type RequestType = 'Incoming' | 'Outgoing';

interface Props {
  request: PendingRequest;
  type: RequestType;
}

export const RequestItem: React.FC<Props> = ({ request, type }) => (
  <FriendRequest>
    <div>
      <Profile>
        <Avatar />
        <UserData>
          <strong>
            {type === 'Outgoing'
              ? request.toUser.username
              : request.fromUser.username}
          </strong>
          <span>
            {type === 'Outgoing'
              ? "Outgoing Friend Request"
              : "Incoming Friend Request"}
          </span>
        </UserData>
      </Profile>
    </div>
    <RequestActionsItem
      requestUser={
        type === 'Outgoing'
          ? request.toUser.username
          : request.fromUser.username
      }
      requestId={request._id}
      type={type}
    />
  </FriendRequest>
);
