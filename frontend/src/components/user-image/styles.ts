import styled from 'styled-components';
import { UserStatusProps, AvatarImageProps } from '.';

export const AvatarImage = styled.img<AvatarImageProps>`
  display: block;
  object-fit: cover;
  pointer-events: none;
  width: 100%;
  height: 100%;
  grid-area: 1/1;
  border-radius: 50%;
  width: ${({ customSize }) => (customSize ? `${customSize}px` : '32px')};
  ${(props) => (props.customHeight ? `height: ${props.customHeight}px` : '')}
`;

export const GenericSvg = styled.svg`
  margin-right: 10px;
`;

export const UserStatus = styled.div<UserStatusProps>`
  border-radius: 50%;
  position: absolute;
  display: flex;
  bottom: -4px;
  right: -1px;
  width: 16px;
  height: 16px;
  margin-right: -2px;
  > div {
    border: 3px solid var(--background-primary);
    position: relative;
    display: inline-flex;
    border-radius: 50%;
    background-color: ${(props) =>
      props.isOnline ? 'var(--green)' : 'var(--gray)'};
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

export const StatusOffline = styled.div`
  width: 100%;
  background: var(--background-secondary);
  border-radius: 50%;
  width: 4px;
  height: 4px;
`;

export const AvatarImageContainer = styled.div`
  position: relative;
  cursor: pointer;
`;
