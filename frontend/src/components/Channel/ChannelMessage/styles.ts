import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  align-items: flex-start;
  margin-right: 4px;
  background-color: transparent;
  /* height: auto; */
  & + div {
    margin-top: 13px;
  }
  &.normal {
    margin-top: 1.0625rem;
    padding: 2px 16px;
  }
  &.stackMessage {
    margin-top: 1px;
    align-items: center;
    padding: 1px 16px;
  }
  &:hover {
    background-color: var(--background-message-hover);
  }
  > .messageDate {
    color: var(--gray);
    font-size: 11px;
    width: 40px;
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

export const Message = styled.div`
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
  font-size: 1rem;
  line-height: 1.375rem;
  white-space: break-spaces;
  word-wrap: break-word;
  font-weight: 300;
  color: var(--text-normal);
`;

export const Mention = styled.span`
  color: var(--link);
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
`;
