import styled from 'styled-components';
import { AlternateEmail } from '@styled-icons/material';

export const Container = styled.main`
  grid-area: CD;
  position: relative;
  display: flex;
  flex-direction: column;
  flex: 1 1 auto;
  box-sizing: border-box;
  max-height: calc(100vh - 46px);
`;

export const MessagesWrapper = styled.div`
  min-height: 0;
  flex: 1 1 auto;
  overflow: hidden;
  > section {
    height: 100%;
    overflow-anchor: none;
    overflow-x: hidden;
    overflow-y: scroll;
  }
`;

export const MessagesContainer = styled.div`
  position: relative;
  min-height: 100%;
  display: flex;
  overflow-anchor: none;
  flex-direction: column;
  justify-content: flex-end;
  align-items: stretch;
`;

export const Messages = styled.ol`
  min-height: 0;
  > .lastMessage {
    height: 30px;
  }
`;

export const MessageBoxContainer = styled.div`
  padding-left: 16px;
  padding-right: 16px;
  position: relative;
  flex-shrink: 0;
  margin-top: -8px;
`;

export const InputContainer = styled.div`
  width: 100%;
  max-height: 24rem;
  display: flex;
  align-items: center;
  background-color: var(--chat-input);
  border-radius: 7px;
  margin-bottom: 24px;
  padding-right: 2px;
  max-height: 50vh;
`;

export const InputWrapper = styled.div`
  display: flex;
  width: 100%;
  line-height: 1.25rem;
  resize: none;
  > div {
    display: flex;
    width: 100%;
    padding-left: 16px;
    overflow-y: scroll !important;
    overflow-x: hidden !important;
  }
`;

export const Wrapper = styled.div`
  width: 100%;
  max-height: 50vh;
`;

export const Input = styled.div`
  position: relative;
  flex: 1;
  outline: none;
  overflow-wrap: break-word;
  font-size: 16px;
  line-height: 1.25rem;
  max-height: 50vh;
  padding-bottom: 11px;
  padding-top: 12px !important;
  caret-color: var(--text-normal);
  text-align: left;
  word-break: break-word;
  white-space: break-spaces !important;
  padding-right: 10px;
`;

export const TypingAnnounce = styled.div`
  position: absolute;
  bottom: 0;
  margin-bottom: 3px;
  font-size: 14px;
  padding-left: 4px;
  color: var(--text-normal);
  > strong {
    color: #fff;
  }
`;

export const InputLeftSide = styled.div`
  position: sticky;
  top: 0;
  display: flex;
  align-items: center;
  height: 44px;
  width: 40px;
`;

export const InputRightSide = styled.div`
  position: sticky;
  top: 0;
  display: flex;
  align-items: center;
  height: 44px;
  margin-right: 4px;
`;

export const InputIcon = styled(AlternateEmail)`
  width: 24px;
  height: 24px;
  color: var(--gray);
`;
