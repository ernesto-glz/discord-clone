import React from 'react';
import {
  FileTray as FileIcon,
  HelpCircle as HelpIcon,
} from '@styled-icons/ionicons-solid';
import { HeaderButton } from './HeaderButton';

const FriendsHeader: React.FC = () => {
  return (
    <div className="header-container">
      <div className="menu-options">
        <img
          src={`${ASSETS_PATH}img/user-raising-hand.svg`}
          className="user-raising-hand"
        />
        <h1 className="title">Friends</h1>
        <div className="divider" />
        <HeaderButton section="ONLINE" name="Online" />
        <HeaderButton section="ALL" name="All" />
        <HeaderButton section="PENDING" name="Pending" />
        <HeaderButton section="ADD" name="Add Friend" />
      </div>

      <div className="menu-actions">
        <FileIcon className="menu-image" />
        <HelpIcon className="menu-image" />
      </div>
    </div>
  );
};

export default FriendsHeader;
