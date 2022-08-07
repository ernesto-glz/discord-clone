import React from 'react';

interface FormProps extends React.ComponentProps<'input'> {
  error?: string;
}

export const AddFriendInput = React.forwardRef<HTMLInputElement, FormProps>(
  (props, ref) => {
    return (
      <div className="input-wrapper">
        <input ref={ref} {...props} className="add-friend-input" autoComplete="off" />
      </div>
    );
  }
);
