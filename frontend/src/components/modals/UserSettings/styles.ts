import { Close } from '@styled-icons/material';
import styled from 'styled-components';
import { NavItemProps } from './UserSettings';

export const SettingsContainer = styled.section`
  color: #fff;
  width: 100vw;
  height: 100vh;
  display: flex;
  box-sizing: border-box;
  position: relative;
`;

export const SidebarRegion = styled.div`
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  background-color: var(--background-secondary);
  flex: 1 0 218px;
  box-sizing: border-box;
  > .scrollerBase {
    overflow: hidden scroll;
    > .settingsNav {
      height: 100%;
      width: 218px;
      padding: 60px 6px 60px 20px;
    }
  }
`;

export const NavList = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  height: 100%;
`;

export const NavTitle = styled.div`
  padding-top: 0px !important;
  padding: 6px 10px;
  font-size: 12px;
  font-weight: 700;
  font-family: var(--font-display);
  line-height: 16px;
  text-transform: uppercase;
  color: var(--channels-default);
`;

export const NavItem = styled.div<NavItemProps>`
  padding-top: 6px;
  padding-bottom: 6px;
  margin-bottom: 2px;
  border-radius: 4px;
  padding: 6px 10px;
  color: var(--interactive-normal);
  position: relative;
  font-size: 16px;
  line-height: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  ${(props) => props.isActive && `
    background-color: var(--background-modifier-selected);
    cursor: default;
  `}
  &:hover {
    background-color: var(--background-modifier-selected);
  }
`;

export const Separator = styled.div`
  margin: 8px 10px;
  height: 1px;
  background-color: var(--background-modifier-accent);
`;

export const SettingsBody = styled.div`
  position: relative;
  display: flex;
  flex: 1 1 800px;
  align-items: flex-start;
  background: var(--background-primary);
  > .scrollerBase {
    width: 100%;
    height: 100%;
    position: static;
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    overflow-x: hidden;
  }
`;

export const ContentWrapper = styled.div`
  position: relative;
  padding: 60px 40px 80px;
  flex: 1 1 auto;
  max-width: 740px;
  min-width: 460px;
  min-height: 100%;
  overflow: hidden;
  > div {
    width: 100%;
    box-sizing: border-box;
  }
`;

export const SectionTitle = styled.div`
  width: 100%;
  height: 44px;
  > h1 {
    color: var(--header-primary);
    margin-bottom: 20px;
    box-sizing: border-box;
    font-size: 20px;
    line-height: 24px;
  }
  > h5 {
    color: var(--header-secondary);
    font-size: 12px;
    line-height: 16px;
    font-weight: 600;
    text-transform: uppercase;
  }
`;

export const ToolsContainer = styled.div`
  margin-right: 21px;
  position: relative;
  flex: 0 0 36px;
  margin-right: 35px;
  width: 60px;
  padding-top: 60px;
  > .tools {
    position: fixed;
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
  }
`;

export const ButtonContainer = styled.div`
  border: 2px solid var(--interactive-normal);
  border-radius: 50%;
  cursor: pointer;
  width: 37px;
  height: 37px;
  display: flex;
  justify-content: center;
  align-items: center;
  &:hover {
    border-color: var(--interactive-hover);
    background-color: var(--background-modifier-hover);
    > .closeBtn {
      color: var(--interactive-hover);
    }
  }
`;

export const Keybind = styled.div`
  color: var(--interactive-normal);
  margin-top: 8px;
  font-weight: 600;
  font-size: 13px;
  text-align: center;
`;

export const CloseButton = styled(Close)`
  width: 23px;
  height: 23px;
  color: var(--interactive-normal);
`;

export const AccountProfileCard = styled.div`
  background-color: var(--background-tertiary);
  border-radius: 8px;
  position: relative;
  overflow: hidden;
  box-sizing: border-box;
  > .banner {
    background-color: rgb(29, 22, 22);
    background-repeat: no-repeat;
    background-position: 50%;
    background-size: cover;
    width: 100%;
    height: 100px
  }
`;

export const UserInfoRegion = styled.div`
  height: 72px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding: 16px 16px 0 120px;
  box-sizing: border-box;
`;

export const UserAvatar = styled.div`
  width: 80px;
  height: 80px;
  border: 7px solid var(--background-tertiary);
  background-color: var(--background-tertiary);
  position: absolute;
  top: 76px;
  left: 16px;
  box-sizing: content-box;
  border-radius: 50%;
  > img {
    pointer-events: none;
    position: relative;
    display: block;
    height: 100%;
    width: auto;
    border-radius: 50%;
 }
`;

export const ProfileUsername = styled.div`
  display: flex;
  > .userTag {
    margin-bottom: 6px;
    font-family: var(--font-display);
    color: var(--header-primary);
    font-size: 19px;
    line-height: 24px;
    font-weight: 600;
    > .discrim {
      color: var(--header-secondary);
    }
  }
`;

export const EditProfileButton = styled.button`
  color: #fff;
  background-color: var(--brand-experiment);
  box-sizing: border-box;
  width: auto;
  height: 32px;
  min-width: 60px;
  min-height: 32px;
  cursor: pointer;
  &:hover {
    background-color: var(--brand-experiment-560);
  }
`;

export const InfoList = styled.div`
  border-radius: 8px;
  background-color: var(--background-secondary);
  padding: 16px;
  margin: 8px 16px 16px;
  > .leftSIde {

  }
`;

export const Divider = styled.div`
  width: 100%;
  height: 1px;
  border-top: thin solid var(--background-modifier-accent);
  margin-top: 40px;
`;

export const UserSecuritySection = styled.div`
  margin-top: 40px;
  > .desc {
    margin-bottom: 16px;
    color: var(--header-secondary);
    font-size: 14px;
    line-height: 20px;
    font-weight: 300;
    margin-top: -10px;
  }
`;

export const AccountRemovalSection = styled.div`
  margin-top: 40px;
  > .desc {
    margin-bottom: 16px;
    color: var(--header-secondary);
    font-size: 14px;
    line-height: 20px;
    font-weight: 300;
    margin-top: -20px;
  }
  > .actions {
    display: flex;
    flex-direction: row;
    gap: 20px;
  }
`

export const DisableButton = styled.button`
  color: #fff;
  background-color: var(--button-danger-background);
  box-sizing: border-box;
  width: auto;
  height: 32px;
  min-width: 60px;
  min-height: 32px;
  cursor: pointer;
  &:hover {
    background-color: var(--button-danger-background-hover);
  }
`;

export const DeleteButton = styled.button`
  color: #fff;
  border: 1px solid hsl(359,calc(var(--saturation-factor, 1)*82.6%),59.4%);
  box-sizing: border-box;
  width: auto;
  height: 32px;
  min-width: 60px;
  min-height: 32px;
  cursor: pointer;
  &:hover {
    background-color: var(--button-danger-background);
  }
`;
