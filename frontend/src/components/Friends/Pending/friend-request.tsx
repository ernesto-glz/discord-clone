import React, { useMemo } from 'react';
import { UserImage } from 'src/components/UserImage';
import { Profile, UserData } from 'src/components/UserInfo/styles';
import { FriendRequest } from 'src/models/friend.model';
import { FriendRequest as FriendRequestContainer, ItemBody } from '../styles';
import { RequestActionsItem } from './request-actions';

export type RequestType = 'Incoming' | 'Outgoing';

interface Props {
  request: FriendRequest;
  type: RequestType;
}

export const RequestItem: React.FC<Props> = ({ request, type }) => {
  const requestUser = useMemo(
    () => (type === 'Outgoing' ? request.to : request.from),
    [request]
  );
  return (
    <FriendRequestContainer>
      <ItemBody>
        <div>
          <Profile>
            <UserImage
              imageUrl={`/assets/avatars/${requestUser.avatar}.png`}
              isGeneric={false}
            />
            <UserData>
              <strong>{requestUser.username}</strong>
              <span>
                {type === 'Outgoing'
                  ? 'Outgoing Friend Request'
                  : 'Incoming Friend Request'}
              </span>
            </UserData>
          </Profile>
        </div>
        <RequestActionsItem
          requestUser={requestUser}
          requestId={request._id}
          type={type}
        />
      </ItemBody>
    </FriendRequestContainer>
  );
};