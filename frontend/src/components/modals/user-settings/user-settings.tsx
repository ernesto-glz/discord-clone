import { Close } from '@styled-icons/material';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
  const navigate = useNavigate();

  const closeModal = () => {
    dispatch(ui.closedModal());
  };

  const handleLogout = () => {
    closeModal();
    navigate('/logout');
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

  return (user) ? (
    <Modal size="full" name="UserSettings">
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
                <NavItem onClick={handleLogout} isActive={false}>
                  Log Out
                </NavItem>
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
                {activeOption === 'Account' && <MyAccount changeOption={setActiveOption} />}
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
