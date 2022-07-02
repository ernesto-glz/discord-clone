import React from 'react';
import {
  ErrorMessage,
  InputTitle
} from 'src/styled-components/login-and-register';
import { Input } from 'src/styled-components/input.styled';

interface Props {
  errors: { email: null; password: null };
  handler: {
    value: any;
    onChange: (val: any) => void;
  };
  type?: 'password' | 'text';
  title: string;
}

export const AuthInput: React.FC<Props> = ({
  errors,
  handler,
  title,
  type = 'text'
}) => (
  <React.Fragment>
    <InputTitle error={errors.password}>
      <span>{title}</span>
      {errors.password && <ErrorMessage>-{errors.password}</ErrorMessage>}
    </InputTitle>
    <Input {...handler} type={type} />
  </React.Fragment>
);
