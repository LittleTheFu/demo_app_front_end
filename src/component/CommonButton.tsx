import React from 'react';
import { IconButton, SvgIconTypeMap } from '@material-ui/core';
import { OverridableComponent } from '@material-ui/core/OverridableComponent';

interface CommonButtonProps {
    IconComponent: IconComponent;
    clickAction: (e?: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

type IconComponent = OverridableComponent<SvgIconTypeMap<{}, "svg">>;

export const CommonButton: React.FC<CommonButtonProps> = (props: CommonButtonProps) => {
    const { clickAction } = props;
    return (
        <IconButton
            onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>): void => {
                e.stopPropagation();
                clickAction(e);
            }}
        >
            <props.IconComponent />
        </IconButton>
    );
};