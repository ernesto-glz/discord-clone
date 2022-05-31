import styled from 'styled-components';
import { Props } from '.';

export const Button = styled.button<Props>`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  margin-bottom: 8px;
  background-color: ${(props) =>
    props.isHome ? 'var(--brand-experiment)' : 'var(--primary)'};
  position: relative;

  cursor: pointer;

  > img {
    width: 100%;
    height: 100%;
    width: 48px;
    height: 48px;
    border-radius: 50%;
    transition: border-radius 0.2s;
    &:hover {
      border-radius: 16px;
    }
  }

  &::before {
    content: '';
    width: 9px;
    height: 9px;
    position: absolute;
    left: -17px;
    top: calc(50% - 4.5px);
    background-color: var(--white);
    border-radius: 50%;
    display: ${(props) => (props.hasNotifications ? 'inline' : 'none')};
  }

  &::after {
    content: '${(props) => props.mentions && props.mentions}';
    background-color: var(--notification);
    width: auto;
    height: 16px;
    padding: 0 4px;
    position: absolute;
    bottom: -4px;
    right: -4px;
    border-radius: 12px;
    border: 4px solid var(--quaternary);
    text-align: right;
    font-size: 13px;
    font-weight: bold;
    color: var(--white);
    display: ${(props) =>
      props.mentions && props.mentions > 0 ? 'inline' : 'none'};
  }

  transition: border-radius 0.2s, background-color 0.2s;

  &.active,
  &:hover {
    border-radius: 16px;
    background-color: ${(props) =>
      props.isHome ? 'var(--brand-experiment)' : 'var(--discord)'};
  }
`;
