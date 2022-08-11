import { PlusCircleFill } from '@styled-icons/bootstrap';
import React from 'react';

interface Props {
  editMode?: boolean;
}

export const MessageBoxLeftSide: React.FC<Props> = ({ editMode }) => {
  return !editMode ? (
    <div className="message-box-left">
      <PlusCircleFill className="option upload" />
    </div>
  ) : null;
};
