import classNames from 'classnames';
import React from 'react';

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
  onKeyDown = () => {},
}) => {
  return (
    <div className="input-wrapper">
      <h5 className={classNames('input-title', { error: !!error })}>
        <span className="title">{title}</span>
        {error && <span className="input-error">- {error}</span>}
      </h5>
      <input
        className="base-input"
        onKeyUp={onKeyUp}
        onKeyDown={onKeyDown}
        {...handler}
        type={type}
      />
    </div>
  );
};
