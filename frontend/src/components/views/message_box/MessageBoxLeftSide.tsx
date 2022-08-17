import React from 'react';
import { faCirclePlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface Props {
  editMode?: boolean;
}

export const MessageBoxLeftSide: React.FC<Props> = ({ editMode }) => {
  return !editMode ? (
    <div className="message-box-left">
      <FontAwesomeIcon icon={faCirclePlus} className="option upload" />
    </div>
  ) : null;
};
