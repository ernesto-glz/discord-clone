import React from 'react';
import {
  AvatarImage,
  AvatarImageContainer,
  GenericSvg,
  StatusOffline,
  UserStatus
} from './styles';

interface Props {
  imageUrl?: string;
  isGeneric: boolean;
  displayStatus?: boolean;
}

export interface UserStatusProps {
  isOnline: boolean;
}

export const FriendsImg: React.FC = () => (
  <svg
    className="linkButtonIcon"
    aria-hidden="false"
    width="24"
    height="32"
    viewBox="0 0 24 24"
  >
    <g fill="none" fillRule="evenodd">
      <path
        fill="var(--gray)"
        fillRule="nonzero"
        d="M0.5,0 L0.5,1.5 C0.5,5.65 2.71,9.28 6,11.3 L6,16 L21,16 L21,14 C21,11.34 15.67,10 13,10 C13,10 12.83,10 12.75,10 C8,10 4,6 4,1.5 L4,0 L0.5,0 Z M13,0 C10.790861,0 9,1.790861 9,4 C9,6.209139 10.790861,8 13,8 C15.209139,8 17,6.209139 17,4 C17,1.790861 15.209139,0 13,0 Z"
        transform="translate(2 4)"
      />
      <path d="M0,0 L24,0 L24,24 L0,24 L0,0 Z M0,0 L24,0 L24,24 L0,24 L0,0 Z M0,0 L24,0 L24,24 L0,24 L0,0 Z" />
    </g>
  </svg>
);

export const UserImage: React.FC<Props> = ({
  imageUrl,
  isGeneric = false,
  displayStatus
}) => {
  const isOnline = true;

  if (isGeneric) {
    return (
      <GenericSvg
        className="linkButtonIcon"
        aria-hidden="false"
        width="24"
        height="32"
        viewBox="0 0 24 24"
      >
        <g fill="none" fillRule="evenodd">
          <path
            fill="currentColor"
            fillRule="nonzero"
            d="M0.5,0 L0.5,1.5 C0.5,5.65 2.71,9.28 6,11.3 L6,16 L21,16 L21,14 C21,11.34 15.67,10 13,10 C13,10 12.83,10 12.75,10 C8,10 4,6 4,1.5 L4,0 L0.5,0 Z M13,0 C10.790861,0 9,1.790861 9,4 C9,6.209139 10.790861,8 13,8 C15.209139,8 17,6.209139 17,4 C17,1.790861 15.209139,0 13,0 Z"
            transform="translate(2 4)"
          />
          <path d="M0,0 L24,0 L24,24 L0,24 L0,0 Z M0,0 L24,0 L24,24 L0,24 L0,0 Z M0,0 L24,0 L24,24 L0,24 L0,0 Z" />
        </g>
      </GenericSvg>
    );
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
