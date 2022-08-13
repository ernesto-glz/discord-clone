import classNames from 'classnames';
import React from 'react';

interface Props extends React.ComponentProps<'div'> {
  imageUrl?: string;
  displayStatus?: boolean;
  isOnline?: boolean;
  customSize?: number;
}

export const BaseAvatar: React.FC<Props> = (props) => {
  const { imageUrl, displayStatus, isOnline = false, customSize } = props;
  return (
    <div className={props.className + ' avatar-container'}>
      <img
        className="base-avatar"
        src={imageUrl}
        alt="avatar"
        style={{ width: customSize }}
      />

      {displayStatus && (
        <div className={classNames('user-status', { statusOnline: isOnline })}>
          <div>{!isOnline && <div className="status-offline" />}</div>
        </div>
      )}
    </div>
  );
};
