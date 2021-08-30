import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Delete, Edit } from '@material-ui/icons';
import { IconButton, TextField } from '@material-ui/core';
import { UserHead } from './UserHead';

const useStyles = makeStyles({
    root: {
        maxWidth: 345,
    },
});

interface EditCardProps {
    title: string;
    content: string;

    acceptClick: (title: string, content: string) => void;
    cancelClick: () => void;
}

export const EditCard: React.FC<EditCardProps> = (props: EditCardProps) => {
    const classes = useStyles();
    const [title, setTitle] = useState(props.title);
    const [content, setContent] = useState(props.content);

    return (
        <Card className={classes.root}>
            <CardActionArea>
                <CardContent>
                    <TextField id="title"
                        label="title"
                        defaultValue={props.title}
                        onChange={(e): void => {
                            setTitle(e.target.value);
                        }} />
                    <TextField id="content"
                        label="content"
                        defaultValue={props.content}
                        onChange={(e): void => {
                            setContent(e.target.value);
                        }} />
                </CardContent>
            </CardActionArea>
            <CardActions>
                <Button size="small" color="primary"
                    onClick={() => { props.acceptClick(title, content) }}>
                    accept
                </Button>
                <Button size="small" color="primary" onClick={props.cancelClick}>
                    cancel
                </Button>
            </CardActions>
        </Card>
    );
};




