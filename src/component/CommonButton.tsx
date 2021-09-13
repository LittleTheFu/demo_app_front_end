import React from 'react';
import { IconButton, SvgIconTypeMap } from '@material-ui/core';
import { OverridableComponent } from '@material-ui/core/OverridableComponent';

interface CommonButtonProps {
    IconComponent: OverridableComponent<SvgIconTypeMap<{}, "svg">>;
    clickAction: (e?: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

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