import classNames from 'classnames';
import React from 'react';
import { MenuItem } from 'react-contextmenu';

interface CtxItemProps {
  children: React.ReactNode;
  onClick?: () => any;
  danger?: boolean;
}

export const ContextItem: React.FC<CtxItemProps> = ({
  onClick = function () {},
  children,
  danger = false,
}) => {
  return (
    // @ts-expect-error
    <MenuItem
      className={classNames('menuItem', { 'danger': danger })}
      onClick={onClick}
    >
      {children}
    </MenuItem>
  );
};
