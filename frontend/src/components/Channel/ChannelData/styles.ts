import styled from 'styled-components';
import { AlternateEmail } from '@styled-icons/material';

export const Container = styled.div`
  grid-area: CD;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: var(--primary);
`;

export const MessagesContainer = styled.section`
  height: 100%;
  max-height: calc(100vh - 46px - 72px);
  overflow-y: scroll;
  overflow-x: hidden;
  display: flex;
  flex-direction: column;
  ::-webkit-scrollbar {
    width: 8px;
    background-color: var(--secondary);
    border-radius: 10px;
  }

  ::-webkit-scrollbar-thumb {
    background-color: var(--tertiary);
    border-radius: 10px;
  }
`;

export const Messages = styled.div`
  flex: 1;
  min-height: 0;
  max-height: calc(100vh - 46px - 72px);
  padding: 5px 0;
  padding-right: 4px;
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
