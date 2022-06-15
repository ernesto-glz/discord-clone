import styled from 'styled-components';
import { FileTray, HelpCircle } from '@styled-icons/ionicons-solid';
import { Hashtag } from '@styled-icons/heroicons-outline';
import { AlternateEmail } from '@styled-icons/material';
import { AddFriendProps, MenuButtonProps } from '.';

export const Container = styled.div`
  grid-area: CI;
  display: flex;
  padding: 0 17px;
  background-color: var(--primary);
  box-shadow: rgba(0, 0, 0, 0.2) 0px 1px 0px 0px;
  z-index: 2;
  div.channel-info {
    flex: 1;
    display: flex;
    align-items: center;
  }
  div.actions {
    display: flex;
    align-items: center;
  }
`;

export const HashtagIcon = styled(Hashtag)`
  width: 24px;
  height: 24px;
  color: var(--symbol);
`;

export const Title = styled.h1`
  margin-left: 9px;
  font-size: 16px;
  font-weight: bold;
  color: var(--white);
`;

export const Separator = styled.div`
  height: 24px;
  width: 1px;
  background-color: var(--white);
  opacity: 0.2;
  margin: 0 13px;
`;

export const Description = styled.span`
  font-size: 15px;
  color: var(--gray);
`;

export const FileIcon = styled(FileTray)`
  width: 25px;
  height: 25px;
  color: var(--gray);
  transition: 0.2s;
  margin: auto 6px;
  cursor: pointer;
  &:hover {
    color: var(--white);
  }
`;

export const HelpIcon = styled(HelpCircle)`
  width: 25px;
  height: 25px;
  color: var(--gray);
  transition: 0.2s;
  margin: auto 6px;
  cursor: pointer;
  &:hover {
    color: var(--white);
  }
`;

export const AIcon = styled(AlternateEmail)`
  width: 24px;
  height: 24px;
  color: var(--gray);
`;

export const AddFriendBtn = styled.button<AddFriendProps>`
  background-color: ${(props) =>
    props.active
      ? 'transparent'
      : 'hsl(139, calc(var(--saturation-factor, 1) * 47.3%), 43.9%)'};
  color: ${(props) => {
    if (props.active) {
      return 'hsl(139, calc(var(--saturation-factor, 1) * 47.3%), 43.9%)';
    }
    return 'hsl(0, calc(var(--saturation-factor, 1) * 0%), 100%)';
  }};
  min-width: 40px;
  border-radius: 4px;
  margin: 0 8px;
  padding: 2px 8px;
  font-size: 16px;
  line-height: 20px;
  cursor: pointer;
`;

export const MenuButton = styled.button<MenuButtonProps>`
  background-color: ${(props) =>
    props.isActive ? 'var(--background-modifier-selected)' : 'transparent'};
  color: hsl(0, calc(var(--saturation-factor, 1) * 0%), 100%);
  min-width: 40px;
  border-radius: 4px;
  margin: 0 8px;
  padding: 2px 8px;
  font-size: 16px;
  line-height: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  &:hover {
    background-color: var(--background-modifier-hover);
  }
`;

export const NotificationMark = styled.div`
  width: 15px;
  height: 15px;
  border-radius: 50%;
  margin-left: 7px;
  background-color: var(--notification);
  font-size: 13px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
