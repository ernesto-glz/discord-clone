import React from 'react';
import {
  AvatarImage,
  AvatarImageContainer,
  StatusOffline,
  UserStatus
} from './styles';

interface Props {
  imageUrl?: string;
  displayStatus?: boolean;
  isOnline?: boolean;
  customSize?: number;
}

export interface AvatarImageProps {
  customSize?: number;
  customHeight?: number;
}

export interface UserStatusProps {
  isOnline: boolean;
}

export const UserImage: React.FC<Props> = ({
  imageUrl,
  displayStatus,
  isOnline = false,
  customSize
}) => {
  return (
    <AvatarImageContainer>
      <AvatarImage
        src={imageUrl}
        alt="avatar"
        aria-hidden="true"
        customSize={customSize}
      />

      {displayStatus && (
        <UserStatus isOnline={isOnline}>
          <div>{!isOnline && <StatusOffline />}</div>
        </UserStatus>
      )}
    </AvatarImageContainer>
  );
};
