import styled from 'styled-components';
import { AlternateEmail } from '@styled-icons/material';

export const Container = styled.div`
  grid-area: CD;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: var(--primary);
  position: relative;
  > section {
    height: 100%;
    overflow-y: scroll;
    overflow-x: hidden;
    margin-right: 5px;
    margin-top: 5px;
    margin-bottom: 5px;
    flex: 1 1 auto;
    ::-webkit-scrollbar {
      width: 8px;
      background-color: var(--secondary);
      border-radius: 10px;
    }

    ::-webkit-scrollbar-thumb {
      background-color: var(--tertiary);
      border-radius: 10px;
    }
  }
`;

export const MessagesContainer = styled.ol`
  min-height: 0;
  min-height: 100%;
  padding: 5px 0;
  padding-right: 4px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
`;

export const Messages = styled.div`
  height: auto;
  max-height: calc(100vh - 46px - 72px);
  max-width: 100%;
  padding-bottom: 10px;
  box-sizing: border-box;
  padding-right: 25px;
`;

export const InputContainer = styled.div`
  display: flex;
  align-items: flex-start;
  width: 100%;
  height: 72px;
  padding: 4px 16px;
`;

export const InputWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  padding: 0 16px;
  background-color: var(--chat-input);
  border-radius: 7px;
`;

export const Input = styled.input`
  flex: 1;
  height: 44px;
  color: var(--text-normal);
  background-color: transparent;
  position: relative;
  font-size: 16px;
  &::placeholder {
    color: var(--gray);
  }
`;

export const InputIcon = styled(AlternateEmail)`
  width: 24px;
  height: 24px;
  color: var(--gray);
`;
