import React from "react";
import { Box, IconButton, SvgIconTypeMap } from "@material-ui/core";
import { OverridableComponent } from "@material-ui/core/OverridableComponent";

interface CommonButtonProps {
  IconComponent: OverridableComponent<SvgIconTypeMap<{}, "svg">>;
  clickAction?: () => void;
  visible: boolean;
  count?: number;
}

export const CommonButton: React.FC<CommonButtonProps> = (
  props: CommonButtonProps
) => {
  const { clickAction, visible, count } = props;

  return (
    <Box component="div" display={visible ? "inline" : "none"}>
      <IconButton
        onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>): void => {
          e.stopPropagation();
          if (clickAction) {
            clickAction();
          }
        }}
      >
        <props.IconComponent />
        {count}
      </IconButton>
    </Box>
  );
};
