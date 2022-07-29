import React from 'react';
import { CtxBody, CtxMenu } from './styles';

interface CtxMenutProps {
  id: string;
  children: React.ReactNode;
}

export const ContextMenu: React.FC<CtxMenutProps> = (props) => {
  return (
    // @ts-expect-error
    <CtxMenu id={props.id}>
      <CtxBody>{props.children}</CtxBody>
    </CtxMenu>
  );
};
