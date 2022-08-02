import { ContextMenuTrigger } from "react-contextmenu";

interface TriggerProps {
  id: string;
  children: React.ReactNode;
  mouseButton?: "right" | "left";
  holdToDisplay?: number;
}

export const MenuTrigger: React.FC<TriggerProps> = ({
  id,
  mouseButton,
  children,
  holdToDisplay,
}) => {
  return (
    /* @ts-expect-error */
    <ContextMenuTrigger
      mouseButton={mouseButton === "left" ? 0 : 2}
      holdToDisplay={holdToDisplay}
      id={id}
    >
      {children}
    </ContextMenuTrigger>
  );
};
