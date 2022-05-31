import React from 'react';
import { AvatarImage, GenericSvg, UserStatus } from './styles';

interface Props {
  imageUrl?: string;
  isGeneric: boolean;
  displayStatus?: boolean;
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
  isGeneric,
  displayStatus
}) => {
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
    <svg
      width={displayStatus ? '40' : '40'}
      height={displayStatus ? '32' : '40'}
      // viewBox="0 0 40 32"
      className="mask-1FEkla svg-2azL_l"
      aria-hidden="true"
    >
      <foreignObject
        x="0"
        y="0"
        width={displayStatus ? '32' : '40'}
        height={displayStatus ? '32' : '40'}
        mask="url(#svg-mask-avatar-status-round-32)"
      >
        <div className="avatarStack">
          <AvatarImage
            src={`${imageUrl || '/assets/discord-blue-icon.png'} `}
            alt="avatar"
            className="avatarImg"
            aria-hidden="true"
          />
        </div>
      </foreignObject>

      {displayStatus && (
        <svg x="14.5" y="17" width="25" height="15" viewBox="0 0 25 15">
          <mask id="a46440c9-e0ff-4a3d-a98c-20a9bb4eddd5">
            <rect
              x="7.5"
              y="5"
              width="10"
              height="10"
              rx="5"
              ry="5"
              fill="white"
            />
            <rect
              x="6.25"
              y="3.75"
              width="7.5"
              height="7.5"
              rx="3.75"
              ry="3.75"
              fill="black"
            />
            <polygon
              points="-2.16506,-2.5 2.16506,0 -2.16506,2.5"
              fill="black"
              transform="scale(0) translate(13.125 10)"
              className="svgStatusTransform"
            />
            <circle fill="black" cx="12.5" cy="10" r="0" />
          </mask>
          <UserStatus />
        </svg>
      )}
    </svg>
  );
};
