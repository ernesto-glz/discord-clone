import React from 'react';
import {
  ErrorMessage,
  InputTitle
} from 'src/styled-components/login-and-register';
import { Input } from 'src/styled-components/input.styled';

interface Props {
  error?: string;
  handler: { value: any; onChange: (val: any) => void };
  type?: 'password' | 'text';
  title: string;
}

export const AuthInput: React.FC<Props> = ({ error, handler, title, type = 'text' }) => (
  <React.Fragment>
    <InputTitle error={error}>
      <span>{title}</span>
      {error && <ErrorMessage>-{error}</ErrorMessage>}
    </InputTitle>
    <Input {...handler} type={type} />
  </React.Fragment>
);
