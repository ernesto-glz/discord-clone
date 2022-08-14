import React from 'react';

interface Props extends React.ComponentProps<'button'> {}

export const Button: React.FC<Props> = (props) => {
  return (
    <button {...props} className={`base-button ${props.className}`}>
      {props.children}
    </button>
  );
};
