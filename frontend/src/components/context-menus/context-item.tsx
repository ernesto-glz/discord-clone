import React from 'react';
import { MenuItem } from 'react-contextmenu';

interface CtxItemProps {
  children: React.ReactNode;
  onClick?: () => any;
}

export const ContextItem: React.FC<CtxItemProps> = ({
  onClick = function () {},
  children,
}) => {
  return (
    // @ts-expect-error
    <MenuItem className="menuItem" onClick={onClick}>
      {children}
    </MenuItem>
  );
};
