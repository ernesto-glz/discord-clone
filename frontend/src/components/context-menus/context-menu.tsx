import React from 'react';
import { ContextMenu as Context } from 'react-contextmenu';

interface CtxMenutProps {
  id: string;
  children: React.ReactNode;
  onShow?: () => any;
  onHide?: () => any;
}

export const ContextMenu: React.FC<CtxMenutProps> = (props) => {
  return (
    // @ts-expect-error
    <Context
      onHide={props.onHide}
      onShow={props.onShow}
      className="ContextMenu"
      id={props.id}
    >
      <div className="body">{props.children}</div>
    </Context>
  );
};
