import styled from 'styled-components';
import { PersonAdd, Settings, Close } from '@styled-icons/material';

import { CloseIconProps } from '.';

export const Container = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  margin-bottom: 4px;
  padding: 1px 10px;
  border-radius: 5px;
  background-color: transparent;
  transition: background-color 0.2s;
  > div {
    display: flex;
    align-items: center;
    flex: 1 auto;
    padding: 5px 0px;
  }
  > div > span {
    display: flex;
    align-items: center;
    margin-left: 5px;
    color: var(--senary);
    font-size: 15px;
  }
  &:hover,
  &.active {
    background-color: var(--quinary);
    > div > span {
      color: var(--white);
    }
  }
`;

export const InviteIcon = styled(PersonAdd)`
  width: 16px;
  height: 16px;
  color: var(--symbol);
  cursor: pointer;
  transition: color 0.2s;
  margin-right: 5px;
  &:hover {
    color: var(--white);
  }
`;

export const SettingsIcon = styled(Settings)`
  width: 16px;
  height: 16px;
  color: var(--symbol);
  cursor: pointer;
  transition: color 0.2s;
  margin-right: 3px;
  &:hover {
    color: var(--white);
  }
`;

export const CloseIcon = styled(Close)<CloseIconProps>`
  width: 18px;
  height: 18px;
  display: ${(props) => (props.isVisible ? 'block' : 'none')};
  color: var(--interactive-normal);
  cursor: pointer;
  transition: color 0.2s;
  &:hover {
    color: var(--white);
  }
`;

export const NotificationMark = styled.div`
  width: 20px;
  position: absolute;
  left: 275px;
  display: flex;
  justify-content: right;
  align-items: center;
  margin-right: 5px;
  > .notification {
    width: 18px;
    height: 17px;
    border-radius: 50%;
    background-color: var(--notification);
    font-size: 13px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;
