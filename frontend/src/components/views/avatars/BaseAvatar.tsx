import classNames from 'classnames';
import React from 'react';

interface Props extends React.ComponentProps<'div'> {
  imageUrl?: string;
  displayStatus?: boolean;
  isOnline?: boolean;
  customSize?: number;
  customHeight?: number;
}

export const BaseAvatar: React.FC<Props> = (props) => {
  const { imageUrl, displayStatus, isOnline = false, customSize, customHeight } = props;
  return (
    <div className={'avatar-container ' + props.className}>
      <img
        className="base-avatar"
        src={imageUrl}
        alt="avatar"
        style={{ width: customSize, height: customHeight }}
      />

      {displayStatus && (
        <div className={classNames('user-status', { statusOnline: isOnline })}>
          <div>{!isOnline && <div className="status-offline" />}</div>
        </div>
      )}
    </div>
  );
};
