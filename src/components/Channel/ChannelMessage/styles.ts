import styled from 'styled-components';
import { MessageProps } from '.';

export const Container = styled.div`
  display: flex;
  align-items: center;
  padding: 4px 16px;
  margin-right: 4px;
  background-color: transparent;
  & + div {
    margin-top: 13px;
  }
  &.stackMessage {
    margin-top: 0px;
  }
`;

export const Avatar = styled.div`
  width: 40px;
  height: 40px;
  background-color: var(--secondary);
  border-radius: 50%;
  &.stackMessage {
    background-color: transparent;
  }
`;

export const Message = styled.div<MessageProps>`
  min-height: ${(props) => (props.stackMessage ? '15px' : '40px')};
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-left: 17px;
  word-break: break-all;
  padding-right: 40px;
  user-select: text;
  -moz-user-select: text;
  -webkit-user-select: text;
  &.stackMessage {
    margin-left: 57px;
  }
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  > strong {
    color: var(--white);
    font-size: 16px;
  }
  > span {
    margin-left: 6px;
    background-color: var(--discord);
    color: var(--white);
    border-radius: 4px;
    padding: 4px 5px;
    text-transform: uppercase;
    font-weight: bold;
    font-size: 11px;
  }
  > time {
    margin-left: 6px;
    color: var(--gray);
    font-size: 13px;
  }
`;

export const Content = styled.div`
  text-align: left;
  font-size: 16px;
  color: var(--white);
`;

export const Mention = styled.span`
  color: var(--link);
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
`;
