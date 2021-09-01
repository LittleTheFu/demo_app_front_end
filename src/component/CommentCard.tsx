import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { UserHead } from './UserHead';

const useStyles = makeStyles({
    root: {
        maxWidth: 345,
    },
});

interface CommentCardProps {
    content: string;
    author: string;
    authorIcon: string;
    date: Date;

    authorClick?: () => void;
}

export const CommentCard: React.FC<CommentCardProps> = (props: CommentCardProps) => {


    const classes = useStyles();

    return (
        <Card className={classes.root}>
            <CardActionArea>
                <CardContent>
                    <UserHead size={50} userName={props.author} avatar={props.authorIcon}
                        nameClick={props.authorClick} avatarClick={props.authorClick}></UserHead>
                    <Typography variant="body2" color="textSecondary" component="p">
                        {props.content}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                        {props.date?.toString()}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    );
};