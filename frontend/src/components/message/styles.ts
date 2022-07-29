import styled from 'styled-components';
import { ContentProps } from '.';
import {
  availableWidhts,
  availablHeights,
  SkeletonProps
} from './skeleton-message';

export const Container = styled.div`
  display: flex;
  align-items: flex-start;
  margin-right: 4px;
  background-color: transparent;
  border-radius: 4px;
  & + div {
    margin-top: 13px;
  }
  &.normal {
    margin-top: 1.0625rem;
    padding: 2px 16px;
    margin-bottom: 1px;
  }
  &.isExtra {
    margin-bottom: 3px;
    align-items: flex-start;
    padding: 2px 0px;
  }
  &:hover {
    background-color: var(--background-message-hover);
  }
  > .messageDate {
    color: var(--gray);
    font-size: 11px;
    width: 56px;
    padding-left: 12px;
    padding-top: 4px;
    white-space: nowrap;
  }
`;

export const Avatar = styled.div`
  width: 40px;
  height: 40px;
  background-color: var(--background-secondary);
  border-radius: 50%;
  &.isExtra {
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
  &.isExtra {
    margin-left: 57px;
  }
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  > strong {
    color: #ffffff;
    font-weight: 600;
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

export const Content = styled.div<ContentProps>`
  text-align: left;
  font-size: 1rem;
  line-height: 1.375rem;
  white-space: break-spaces;
  word-wrap: break-word;
  font-weight: 300;
  color: var(--text-normal);
  margin-top: ${(props) => `${props.mt}px` ?? '0px'};
`;

export const Mention = styled.span`
  color: var(--link);
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
`;

export const Skeleton = styled.div`
  border-radius: 0.375rem;
  padding-right: 1.25rem;

  padding-bottom: 0.5rem;
  /* max-width: 24rem; */
  width: 100%;

  > .animationContainer {
    display: flex;

    margin-left: 1rem;

    animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
    @keyframes pulse {
      0%,
      100% {
        opacity: 1;
      }
      50% {
        opacity: 0.5;
      }
    }

    > .avatarSkeleton {
      border-radius: 9999px;
      background-color: var(--background-tertiary);
      height: 2.5rem;
      width: 2.5rem;
    }

    > .message {
      flex: 1 1 0%;
      margin-left: 4px;
      padding-top: 0.25rem;
      padding-bottom: 0.25rem;

      > .messageHead {
        height: 1rem;
        background-color: var(--background-tertiary);
        border-radius: 9999px;
        width: 8rem;
        margin-left: 10px;
      }

      > .messageBody {
        margin-top: 0.5rem;
        margin-left: 10px;
        padding-bottom: 0.5rem;
      }
    }
  }
`;

export const SkeletonContent = styled.div<SkeletonProps>`
  margin-top: 10px;
  background-color: var(--background-tertiary);
  width: ${(props) => availableWidhts[props.cWidht]};
  height: ${(props) => availablHeights[props.cHeight]};
  border-radius: ${(props) =>
    availablHeights[props.cHeight] === '1rem' ? '9999px' : '0.25rem'};
`;
