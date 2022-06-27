import React from 'react';
import { UserRaisingHand } from 'src/components/Images/tiny-icons/user-raising-hand';
import { NitroImage } from '../Images/tiny-icons/nitro-image';
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
  customSize?: number;
  genericImage?: 'FRIEND' | 'NITRO';
}

export interface AvatarImageProps {
  customSize?: number;
}

export interface UserStatusProps {
  isOnline: boolean;
}

export const UserImage: React.FC<Props> = ({
  imageUrl,
  isGeneric = false,
  displayStatus,
  isOnline = false,
  customSize,
  genericImage
}) => {
  if (isGeneric && genericImage === 'FRIEND') {
    return <UserRaisingHand width="24" height="32" fill="currentColor" />;
  }

  if (isGeneric && genericImage === 'NITRO') {
    return <NitroImage width="24" height="32" fill="currentColor" />;
  }

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
