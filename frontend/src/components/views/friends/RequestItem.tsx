import React, { useMemo } from 'react';
import { Profile, UserData } from 'src/components/user-info/styles';
import { RequestTypes } from '@discord/types';
import { RequestActionsItem } from './RequestActions';
import { getAvatarUrl } from 'src/utils/utils';
import { BaseAvatar } from '../avatars/BaseAvatar';

interface Props {
  request: RequestTypes.Populated;
  type: RequestTypes.Type;
}

export const RequestItem: React.FC<Props> = ({ request, type }) => {
  const requestUser = useMemo(
    () => (type === 'OUTGOING' ? request.to : request.from),
    [request]
  );

  return (
    <li className="list-item">
      <div>
        <Profile>
          <BaseAvatar imageUrl={getAvatarUrl(requestUser)} />
          <UserData>
            <strong>
              {requestUser.username}
              <span className="discriminator" style={{ opacity: 0 }}>
                #{requestUser.discriminator}
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
        request={request}
        type={type}
      />
    </li>
  );
};
