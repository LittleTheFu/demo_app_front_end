import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    root: {
        maxWidth: 345,
    },
});

export const ArticleDetail: React.FC = () => {
    const classes = useStyles();

    return <h1>detail</h1>
};