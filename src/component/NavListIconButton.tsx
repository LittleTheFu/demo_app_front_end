import React, { ReactNode } from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";

interface NavListIconButtonProps {
  children: ReactNode;
  iconClick: () => void;
  msg: string;
}

export const NavListIconButton: React.FC<NavListIconButtonProps> = ({
  children,
  ...restProps
}: NavListIconButtonProps) => {
  const { iconClick, msg } = restProps;

  return (
    <ListItem button key={3} onClick={iconClick}>
      <ListItemIcon>
        <div>{children}</div>
      </ListItemIcon>
      <ListItemText primary={msg} />
    </ListItem>
  );
};
