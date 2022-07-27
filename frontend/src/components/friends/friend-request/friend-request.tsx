import React, { useMemo, useState } from 'react';
import { UserImage } from 'src/components/user-image';
import { Profile, UserData } from 'src/components/user-info/styles';
import { Entity, RequestTypes } from '@discord/types';
import { FriendRequest as FriendRequestContainer, ItemBody } from '../styles';
import { RequestActionsItem } from './request-actions';

interface Props {
  request: Entity.Request;
  type: RequestTypes.Type;
}

export const RequestItem: React.FC<Props> = ({ request, type }) => {
  const requestUser = useMemo(
    () => (type === 'OUTGOING' ? request.to : request.from),
    [request]
  );
  const [showDiscriminator, setShowDiscriminator] = useState(false);

  return (
    <FriendRequestContainer
      onMouseOver={() => setShowDiscriminator(true)}
      onMouseLeave={() => setShowDiscriminator(false)}
    >
      <ItemBody>
        <div>
          <Profile>
            <UserImage
              imageUrl={`${process.env.REACT_APP_API_ROOT}/assets/avatars/${requestUser.avatar}.png`}
              isGeneric={false}
            />
            <UserData>
              <strong>
                {requestUser.username}
                <span>
                  {showDiscriminator && `#${requestUser.discriminator}`}
                </span>
              </strong>
              <span>
                {type === 'OUTGOING'
                  ? 'Outgoing Friend Request'
                  : 'Incoming Friend Request'}
              </span>
            </UserData>
          </Profile>
        </div>
        <RequestActionsItem
          requestUser={requestUser}
          requestId={request.id}
          type={type}
        />
      </ItemBody>
    </FriendRequestContainer>
  );
};
