import { InputTitleProps } from 'src/pages/auth/login-page';
import styled from 'styled-components';

export const InputBase = styled.input`
  border: none;
  padding: 10px;
  height: 40px;
  font-size: 16px;
  box-sizing: border-box;
  border-radius: 3px;
  color: var(--text-normal);
  width: 100%;
  background-color: var(--background-tertiary);
  transition: border-color 0.2s ease-in-out;
`;

export const InputTitle = styled.h5<InputTitleProps>`
  color: ${(props) => props.error ? 'var(--text-danger)' : 'var(--header-secondary)'};
  font-size: 12px;
  line-height: 16px;
  margin-bottom: 10px;
  > .title {
    text-transform: uppercase;
  }
`;

export const ErrorMessage = styled.span`
  color: var(--text-danger);
  font-size: 13px;
  font-weight: 600;
  font-style: italic;
  text-transform: none;
  margin-left: 4px;
`;
