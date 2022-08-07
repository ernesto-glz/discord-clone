import styled from 'styled-components';
import { Close, Check } from '@styled-icons/material';
import { Message } from '@styled-icons/boxicons-solid';
import { DotsVerticalRounded } from '@styled-icons/boxicons-regular';
import { AddInputProps } from './add-friend';

export const Container = styled.div`
  grid-area: CP;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: var(--background-primary);
`;

export const WampusImage = styled.img`
  width: 24rem;
  height: 15rem;
  user-select: none;
  user-drag: none;
`;

export const WampusMessage = styled.div`
  font-size: 16px;
  color: var(--text-muted);
  font-weight: 300;
`;

export const FlexColumnContainer = styled.div`
  grid-area: CP;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  padding-right: 6px;
  max-height: calc(100vh - 46px);
  padding-bottom: 8px;
`;

export const FriendHeader = styled.header`
  border-bottom: 1px solid var(--background-modifier-accent);
  width: 100%;
  padding: 20px 30px;
  > h2 {
    font-size: 16px;
    line-height: 20px;
    text-transform: uppercase;
    margin-bottom: 8px;
  }
  > form > div {
    font-size: 14px;
    line-height: 20px;
    font-weight: 300;
    color: var(--header-secondary);
  }
  > form > .Error {
    color: var(--text-danger);
  }
  > form > .Success {
    color: hsl(139, calc(var(--saturation-factor, 1) * 47.3%), 43.9%);
  }
`;

export const HeaderContainer = styled.div<AddInputProps>`
  display: flex;
  align-items: center;
  background: var(--background-tertiary);
  width: 100%;
  margin-top: 16px;
  padding: 0 12px;
  padding-left: 2px;
  position: relative;
  border-radius: 8px;
  border: 1px solid;
  border-color: ${(props) => {
    if (props.state.type === 'Success')
      return 'hsl(139, calc(var(--saturation-factor, 1) * 47.3%), 43.9%)';
    if (props.state.type === 'Error') return 'red';
    if (props.focus) return 'var(--text-link)';
    return 'var(--text-input-border)';
  }};
  height: 50px;
  > .inputWrapper {
    flex: 1 1 auto;
    margin-right: 16px;
    padding: 4px 0;
    z-index: 1;
    font-size: 17px;
    font-weight: 500;
    letter-spacing: 0.04em;
    line-height: 20px;
    white-space: pre;
  }
  > button {
    cursor: pointer;
    color: var(--white);
    background-color: var(--brand-experiment);
    height: 32px;
    min-width: 60px;
    min-height: 32px;
    padding: 10px;
    border-radius: 4px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 14px;
    font-weight: 600;
    &:hover {
      background-color: var(--brand-experiment-560);
    }
  }
`;

export const InputHeader = styled.input`
  height: 40px;
  padding: 10px;
  background: transparent;
  color: var(--white);
  width: 100%;
  font-size: 16px;
  line-height: 20px;
`;

export const ListHeader = styled.div`
  width: 100%;
  > h2 {
    margin: 16px 20px 8px 30px;
    color: var(--header-secondary);
    font-size: 12px;
    line-height: 16px;
    letter-spacing: 0.02em;
  }
`;

export const ListBody = styled.div`
  height: 100%;
  overflow: hidden scroll;
  margin-top: 8px;
  display: flex;
  flex-direction: column;
  ::-webkit-scrollbar {
    width: 8px;
    background-color: var(--background-secondary);
    border-radius: 10px;
  }

  ::-webkit-scrollbar-thumb {
    background-color: var(--tertiary);
    border-radius: 10px;
  }
`;

export const FriendRequest = styled.div`
  min-height: 62px;
  cursor: pointer;
  margin-left: 30px;
  margin-right: 20px;
  font-weight: 500;
  font-size: 16px;
  line-height: 18px;
  padding: 0px 10px;
  border-top: 1px solid var(--background-modifier-accent);
  &:hover {
    background: var(--background-modifier-hover);
    -webkit-box-shadow: none;
    box-shadow: none;
    border-radius: 8px;
    border-color: transparent;
  }
`;

export const ItemBody = styled.div`
  display: flex;
  height: 62px;
  flex-grow: 1;
  align-items: center;
  justify-content: center;
  justify-content: space-between;
`;

export const RequestActions = styled.div`
  display: flex;
`;

export const ActionButton = styled.div`
  cursor: pointer;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  color: var(--interactive-normal);
  background-color: var(--background-secondary);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 10px;
  &:hover {
    .accept {
      color: hsl(139, calc(var(--saturation-factor, 1) * 50.3%), 43.9%);
    }
    .cancel {
      color: var(--info-danger-foreground);
    }
    .message {
      color: #fff;
    }
  }
`;

export const CancelIcon = styled(Close)`
  width: 20px;
  color: var(--header-secondary);
`;

export const AcceptIcon = styled(Check)`
  width: 20px;
  color: var(--header-secondary);
`;

export const MessageIcon = styled(Message)`
  width: 20px;
  color: var(--header-secondary);
`;

export const DotsIcon = styled(DotsVerticalRounded)`
  width: 20px;
  color: var(--header-secondary);
`;

export const AddFriendResponse = styled.div`
  &.displayed {
    margin-top: 10px;
    margin-bottom: -10px;
  }
`;
