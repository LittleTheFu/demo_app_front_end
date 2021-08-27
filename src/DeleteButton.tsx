import React from 'react';
import { IconButton } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';

interface DeleteButtonProps {
    clickDelete: (e?: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

export const DeleteButton: React.FC<DeleteButtonProps> = (props: DeleteButtonProps) => {
    const { clickDelete } = props;
    return (
        <IconButton
            onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>): void => {
                e.stopPropagation();
                clickDelete(e);
            }}
        >
            <DeleteIcon></DeleteIcon>
        </IconButton>
    );
};