import React from 'react';
import { CtxItem } from './styles';

interface CtxItemProps {
  children: React.ReactNode;
  onClick?: () => any;
}

export const ContextItem: React.FC<CtxItemProps> = ({
  onClick = function () {},
  children
}) => {
  return (
    // @ts-expect-error
    <CtxItem onClick={onClick}>{children}</CtxItem>
  );
};
