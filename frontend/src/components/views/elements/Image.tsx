import React from 'react';

interface Props extends React.ComponentProps<'img'> {}

export const Image: React.FC<Props> = (props) => {
  return <img {...props} src={_r(props.src)} />;
};
