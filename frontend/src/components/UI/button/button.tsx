import React from "react";

interface Props extends React.ComponentProps<"button"> {}

export const Button: React.FC<Props> = (props) => {
  return (
    <button className="base-button">{props.children}</button>
  )
};
