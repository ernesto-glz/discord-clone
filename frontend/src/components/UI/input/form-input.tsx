import React from 'react';
import classNames from 'classnames';

interface FormProps extends React.ComponentProps<'input'> {
  error?: string;
}

export const FormInput = React.forwardRef<HTMLInputElement, FormProps>(
  (props, ref) => {
    const { error, title } = props;

    return (
      <div className="input-wrapper">
        <h5 className={classNames('input-title', { error: !!error })}>
          <span className="title">{title}</span>
          {error && <span className="input-error">- {error}</span>}
        </h5>
        <input ref={ref} {...props} className="base-input" autoComplete="off" />
      </div>
    );
  }
);
