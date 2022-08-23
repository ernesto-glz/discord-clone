import { ContextMenuTrigger } from 'react-contextmenu';

interface TriggerProps {
  id: string;
  children: React.ReactNode;
  mouseButton?: 'right' | 'left';
}

export const MenuTrigger: React.FC<TriggerProps> = ({
  id,
  mouseButton,
  children,
}) => {
  return (
    /* @ts-expect-error */
    <ContextMenuTrigger
      mouseButton={mouseButton === 'left' ? 0 : 2}
      holdToDisplay={-1}
      id={id}
    >
      {children}
    </ContextMenuTrigger>
  );
};
