import React, { useState } from 'react';
import { Image } from 'src/components/views/elements/Image';
import { useAppDispatch, useAppSelector } from 'src/store/hooks';
import { actions as ui } from 'src/store/states/ui';
import { MyAccount } from './parts/MyAccount';
import { UserProfile } from './parts/UserProfile';
import classNames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose } from '@fortawesome/free-solid-svg-icons';
import Modal from '../modal';

export type Options = 'Account' | 'Profile' | 'Requests';
export type ItemProps = { option: Options; name: string };
export type NavItemProps = { isActive: boolean };

const sectionTitles = {
  Account: 'My Account',
  Profile: 'User Profile',
  Requests: 'Friend Requests',
};

export const UserSettings: React.FC = () => {
  const user = useAppSelector((s) => s.auth.user);
  const [activeOption, setActiveOption] = useState<Options>('Account');
  const dispatch = useAppDispatch();

  const closeModal = () => {
    dispatch(ui.closedModal('UserSettings'));
  };

  const openLogoutConfirm = () => {
    dispatch(ui.openedModal('LogoutConfirm'));
  };

  const Item = (props: ItemProps) => {
    const isActive = activeOption === props.option;
    const onClick = () => setActiveOption(props.option);

    return (
      <div
        className={classNames('navItem', { active: isActive })}
        onClick={onClick}
      >
        {props.name}
      </div>
    );
  };

  return user ? (
    <Modal background={false} name="UserSettings" animationVariant="BigToSmall">
      <div className="UserSettings">
        <div className="sidebar">
          <div className="scrollerBase inputScroller">
            <nav className="settingsNav">
              <div className="navList">
                <h2 className="navTitle">User Settings</h2>
                <Item name="My Account" option="Account" />
                <Item name="User Profile" option="Profile" />
                <Item name="Friend Requests" option="Requests" />
                <div className="divider" />
                <div className="navItem" onClick={openLogoutConfirm}>
                  Log Out <Image src="/img/exit-arrow.svg" />
                </div>
                <div className="divider" />
              </div>
            </nav>
          </div>
        </div>
        <div className="body">
          <div className="scrollerBase">
            <div className="contentWrapper">
              <div className="sectionTitle">
                <h1>{sectionTitles[activeOption]}</h1>
              </div>
              {activeOption === 'Account' && (
                <MyAccount changeOption={setActiveOption} />
              )}
              {activeOption === 'Profile' && <UserProfile />}
              {activeOption === 'Requests' && <h1>Not Implemented</h1>}
            </div>
            <div className="toolsContainer">
              <div className="tools">
                <div className="toolsButtonWrapper" onClick={closeModal}>
                  <FontAwesomeIcon icon={faClose} className="closeBtn" />
                </div>
                <div className="keybind">ESC</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  ) : null;
};
