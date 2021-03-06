import React, { useState } from 'react';
import { LogoutImage } from 'src/components/images/tiny-icons/logout-image';
import { useAppDispatch, useAppSelector } from 'src/redux/hooks';
import { actions as ui } from 'src/redux/states/ui';
import Modal from '../modal';
import { MyAccount } from './my-account';
import {
  ButtonContainer,
  CloseButton,
  ContentWrapper,
  Keybind,
  NavItem,
  NavList,
  NavTitle,
  SectionTitle,
  Separator,
  SettingsBody,
  SettingsContainer,
  SidebarRegion,
  ToolsContainer
} from './styles';

export type Options = 'Account' | 'Profile' | 'Requests';
export type ItemProps = { option: Options; name: string };
export type NavItemProps = { isActive: boolean };

const sectionTitles = {
  Account: 'My Account',
  Profile: 'User Profile',
  Requests: 'Friend Requests'
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
    const onClick = () => {
      setActiveOption(props.option);
    };

    return (
      <NavItem isActive={isActive} onClick={onClick}>
        {props.name}
      </NavItem>
    );
  };

  return user ? (
    <Modal
      background={false}
      name="UserSettings"
      animated
      animationVariant="BigToSmall"
    >
      <SettingsContainer>
        <SidebarRegion>
          <div className="scrollerBase inputScroller">
            <nav className="settingsNav">
              <NavList>
                <NavTitle>User Settings</NavTitle>
                <Item name="My Account" option="Account" />
                <Item name="User Profile" option="Profile" />
                <Item name="Friend Requests" option="Requests" />
                <Separator />
                <NavItem onClick={openLogoutConfirm} isActive={false}>
                  Log Out <LogoutImage />
                </NavItem>
                <Separator />
              </NavList>
            </nav>
          </div>
        </SidebarRegion>
        <SettingsBody>
          <div className="scrollerBase">
            <ContentWrapper>
              <div>
                <SectionTitle>
                  <h1>{sectionTitles[activeOption]}</h1>
                </SectionTitle>
                {activeOption === 'Account' && (
                  <MyAccount changeOption={setActiveOption} />
                )}
                {activeOption === 'Profile' && <h1>Not implemented</h1>}
                {activeOption === 'Requests' && <h1>Not Implemented</h1>}
              </div>
            </ContentWrapper>
            <ToolsContainer>
              <div className="tools">
                <ButtonContainer onClick={closeModal}>
                  <CloseButton className="closeBtn" />
                </ButtonContainer>
                <Keybind>ESC</Keybind>
              </div>
            </ToolsContainer>
          </div>
        </SettingsBody>
      </SettingsContainer>
    </Modal>
  ) : null;
};
