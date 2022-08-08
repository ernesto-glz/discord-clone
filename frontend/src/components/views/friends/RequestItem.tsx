import React, { useMemo, useState } from 'react';
import { UserImage } from 'src/components/user-image';
import { Profile, UserData } from 'src/components/user-info/styles';
import { RequestTypes } from '@discord/types';
import { RequestActionsItem } from './RequestActions';
import { getAvatarUrl } from 'src/utils/utils';

interface Props {
  request: RequestTypes.Populated;
  type: RequestTypes.Type;
}

export const RequestItem: React.FC<Props> = ({ request, type }) => {
  const requestUser = useMemo(
    () => (type === 'OUTGOING' ? request.to : request.from),
    [request]
  );
  const [showDiscriminator, setShowDiscriminator] = useState(false);

  return (
    <li
      className="list-item"
      onMouseOver={() => setShowDiscriminator(true)}
      onMouseLeave={() => setShowDiscriminator(false)}
    >
      <div>
        <Profile>
          <UserImage imageUrl={getAvatarUrl(requestUser)} />
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
        request={request}
        type={type}
      />
    </li>
  );
};
