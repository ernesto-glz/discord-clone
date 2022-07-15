import styled from 'styled-components';
import { Mic, Headset, Settings } from '@styled-icons/material';

export const Container = styled.div`
  grid-area: UI;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  background-color: var(--background-secondary);
  box-shadow: rgba(0, 0, 0, 0.2) 0px 1px 0px;
`;

export const Profile = styled.div`
  display: flex;
  align-items: center;
`;

export const Avatar = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 16px;
  background-color: var(--gray);
`;

export const UserData = styled.div`
  margin-left: 8px;
  display: flex;
  flex-direction: column;
  > strong {
    font-size: 16px;
    color: var(--header-primary);
    font-weight: 300;
    overflow: hidden;
    text-overflow: ellipsis;
    display: block;
    user-select: text;
    -moz-user-select: text;
    -webkit-user-select: text;
    margin-bottom: 2px;
    > span {
      color: var(--header-secondary);
      font-size: 15px;
      line-height: 16px;
      font-weight: 300;
      color: #ffffffb3;
    }
  }
  > span {
    color: var(--header-secondary);
    font-size: 12px;
    line-height: 13px;
    user-select: text;
    -moz-user-select: text;
    -webkit-user-select: text;
  }
  > .userStatus {
    color: #ffffff99;
    font-size: 14px;
  }
`;

export const Icons = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
`;

export const MicIcon = styled(Mic)`
  width: 30px;
  height: 30px;
  color: var(--white);
  opacity: 0.7;
  cursor: pointer;
  padding: 4px;
  transition: opacity 0.2s;
  &:hover {
    opacity: 1;
    background: var(--background-modifier-accent);
    border-radius: 4px;
  }
`;

export const HeadphoneIcon = styled(Headset)`
  width: 30px;
  height: 30px;
  color: var(--white);
  opacity: 0.7;
  cursor: pointer;
  padding: 4px;
  transition: opacity 0.2s;
  &:hover {
    opacity: 1;
    background: var(--background-modifier-accent);
    border-radius: 4px;
  }
`;

export const SettingsIcon = styled(Settings)`
  width: 30px;
  height: 30px;
  color: var(--white);
  opacity: 0.7;
  cursor: pointer;
  transition: opacity 0.2s;
  padding: 4px;
  &:hover {
    opacity: 1;
    background: var(--background-modifier-accent);
    border-radius: 4px;
  }
`;
