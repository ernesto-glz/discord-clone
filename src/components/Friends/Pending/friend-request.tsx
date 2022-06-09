import React, { useMemo } from 'react';
import { UserImage } from 'src/components/UserImage';
import { Profile, UserData } from 'src/components/UserInfo/styles';
import { PendingRequest } from 'src/models/friend.model';
import { FriendRequest } from '../styles';
import { RequestActionsItem } from './request-actions';

export type RequestType = 'Incoming' | 'Outgoing';

interface Props {
  request: PendingRequest;
  type: RequestType;
}

export const RequestItem: React.FC<Props> = ({ request, type }) => {
  const user = useMemo(
    () => (type === 'Outgoing' ? request.toUser : request.fromUser),
    [request]
  );
  return (
    <FriendRequest>
      <div>
        <Profile>
          <UserImage
            imageUrl={`/assets/avatars/${user.avatar}.png`}
            isGeneric={false}
          />
          <UserData>
            <strong>{user.username}</strong>
            <span>
              {type === 'Outgoing'
                ? 'Outgoing Friend Request'
                : 'Incoming Friend Request'}
            </span>
          </UserData>
        </Profile>
      </div>
      <RequestActionsItem
        requestUser={user.username}
        requestId={request._id}
        type={type}
      />
    </FriendRequest>
  );
};
