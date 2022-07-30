import React from 'react';
import { ErrorMessage, InputBase, InputTitle } from './styles';

interface Props {
  error?: string;
  handler: { value: any; onChange: (val: any) => void };
  type?: 'password' | 'text';
  title: string;
  onKeyUp?: (event: React.KeyboardEvent<HTMLInputElement>) => any;
  onKeyDown?: (event: React.KeyboardEvent<HTMLInputElement>) => any;
}

export const Input: React.FC<Props> = ({
  error,
  title,
  type,
  handler,
  onKeyUp = () => {},
  onKeyDown = () => {}
}) => {
  return (
    <div>
      <InputTitle error={error}>
        <span className="title">{title}</span>
        {error && <ErrorMessage>- {error}</ErrorMessage>}
      </InputTitle>
      <InputBase
        onKeyUp={onKeyUp}
        onKeyDown={onKeyDown}
        {...handler}
        type={type}
      />
    </div>
  );
};
