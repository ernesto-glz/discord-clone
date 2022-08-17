import React from 'react';
import { HeaderButton } from './HeaderButton';
import { Image } from '../elements/Image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleQuestion, faInbox } from '@fortawesome/free-solid-svg-icons';

const FriendsHeader: React.FC = () => {
  return (
    <div className="header-container">
      <div className="menu-options">
        <Image src="/img/user-raising-hand.svg" className="user-raising-hand" />
        <h1 className="title">Friends</h1>
        <div className="divider" />
        <HeaderButton section="ONLINE" name="Online" />
        <HeaderButton section="ALL" name="All" />
        <HeaderButton section="PENDING" name="Pending" />
        <HeaderButton section="ADD" name="Add Friend" />
      </div>

      <div className="menu-actions">
        <FontAwesomeIcon icon={faInbox} className="menu-image" />
        <FontAwesomeIcon icon={faCircleQuestion} className="menu-image" />
      </div>
    </div>
  );
};

export default FriendsHeader;
