import { Close } from '@styled-icons/material';
import styled from 'styled-components';
import { ErrorProps } from './edit-username';

export const EditModalBase = styled.div`
  opacity: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border-radius: 4px;
  margin: 0 auto;
  position: relative;
  background-color: var(--modal-background);
  width: 440px;
  max-height: 720px;
  min-height: 200px;
`;

export const Header = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 24px;
  padding-bottom: 24px;
  > .title {
    font-weight: 600;
    font-size: 24px;
    line-height: 30px;
    color: var(--header-primary);
  }
  > .description {
    color: var(--header-secondary);
    margin-top: 8px;
    font-size: 16px;
    line-height: 20px;
  }
`;

export const CloseButton = styled.button`
  background-color: transparent;
  cursor: pointer;
  position: absolute;
  top: 16px;
  right: 16px;
  &:hover {
    > .closeIcon {
      color: var(--header-primary) !important;
    }
  }
`;

export const CloseIcon = styled(Close)`
  color: var(--header-secondary);
  width: 24px;
  height: 24px;
`;

export const Body = styled.div`
  width: 100%;
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  > form {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
`;

export const BodyItem = styled.div<ErrorProps>`
  > h5 {
    margin-bottom: 8px;
    color: ${(props) => props.errorOcurred ? 'var(--text-danger)' : 'var(--header-secondary)'};
    font-weight: 600;
    text-transform: uppercase;
    font-size: 12px;
    line-height: 16px;
  }
`;

export const Footer = styled.div`
  background-color: var(--background-secondary);
  width: 100%;
  padding: 16px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

export const CancelButton = styled.button`
  color: #fff;
  background-color: transparent;
  box-sizing: border-box;
  width: auto;
  height: 32px;
  min-width: 60px;
  min-height: 32px;
  padding: 2px 24px;
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
`;

export const DoneButton = styled.button`
  color: #fff;
  background-color: var(--brand-experiment);
  box-sizing: border-box;
  width: auto;
  height: 32px;
  min-width: 90px;
  min-height: 32px;
  cursor: pointer;
  &:hover {
    background-color: var(--brand-experiment-560);
  }
`;
