import React from 'react';
import { IconButton } from '@material-ui/core';
import Mail from '@material-ui/icons/Mail';

interface MailButtonProps {
    clickMail: (e?: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

export const MailButton: React.FC<MailButtonProps> = (props: MailButtonProps) => {
    const { clickMail } = props;
    return (
        <IconButton
            onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>): void => {
                e.stopPropagation();
                clickMail(e);
            }}
        >
            <Mail></Mail>
        </IconButton>
    );
};