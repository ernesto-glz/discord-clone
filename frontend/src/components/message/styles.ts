import styled from 'styled-components';
import {
  availableWidhts,
  availablHeights,
  SkeletonProps
} from './skeleton-message';

export const Skeleton = styled.div`
  border-radius: 0.375rem;
  padding-right: 1.25rem;

  padding-bottom: 0.5rem;
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
