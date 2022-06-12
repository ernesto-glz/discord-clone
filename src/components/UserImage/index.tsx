import React from 'react';
import { FriendImage } from '../Images';
import {
  AvatarImage,
  AvatarImageContainer,
  StatusOffline,
  UserStatus
} from './styles';

interface Props {
  imageUrl?: string;
  isGeneric: boolean;
  displayStatus?: boolean;
  isOnline?: boolean;
}

export interface UserStatusProps {
  isOnline: boolean;
}

export const UserImage: React.FC<Props> = ({
  imageUrl,
  isGeneric = false,
  displayStatus,
  isOnline = false
}) => {
  if (isGeneric) {
    return <FriendImage width="24" height="32" fill="currentColor" />;
  }

  return (
    <AvatarImageContainer>
      <AvatarImage
        src={`${imageUrl || '/assets/discord-blue-icon.png'} `}
        alt="avatar"
        aria-hidden="true"
      />

      {displayStatus && (
        <UserStatus isOnline={isOnline}>
          <div>{!isOnline && <StatusOffline />}</div>
        </UserStatus>
      )}
    </AvatarImageContainer>
  );
};