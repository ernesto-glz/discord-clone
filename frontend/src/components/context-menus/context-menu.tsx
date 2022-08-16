import React from 'react';
import { ContextMenu as Context } from 'react-contextmenu';

interface CtxMenutProps {
  id: string;
  children: React.ReactNode;
}

export const ContextMenu: React.FC<CtxMenutProps> = (props) => {
  return (
    // @ts-expect-error
    <Context className="ContextMenu" id={props.id}>
      <div className="body">{props.children}</div>
    </Context>
  );
};
