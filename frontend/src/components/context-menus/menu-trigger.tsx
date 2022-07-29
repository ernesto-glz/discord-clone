import { ContextMenuTrigger } from 'react-contextmenu';

interface TriggerProps {
  id: string;
  children: React.ReactNode;
  mouseButton?: 'right' | 'left';
}

export const MenuTrigger: React.FC<TriggerProps> = (props) => {
  return (
    /* @ts-expect-error */
    <ContextMenuTrigger
      mouseButton={props.mouseButton === 'left' ? 0 : 2}
      holdToDisplay={-1}
      id={props.id}
    >
      {props.children}
    </ContextMenuTrigger>
  );
};
