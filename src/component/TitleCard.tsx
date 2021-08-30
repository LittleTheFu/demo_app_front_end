import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { UserHead } from './UserHead';

const useStyles = makeStyles({
    root: {
        maxWidth: 800,
    },
});

interface TitleCardProps {
    id: number;
    title: string;
    author: string;
    authorIcon: string;

    textClick?: () => void;
    authorClick?: () => void;
} 

export const TitleCard: React.FC<TitleCardProps> = (props: TitleCardProps) => {
    const classes = useStyles();

    return ( 
        <Card className={classes.root}>
            <CardActionArea onClick={props.textClick}>
                <CardContent>
                <UserHead size={50} userName={props.author} avatar={props.authorIcon}
                        nameClick={props.authorClick} avatarClick={props.authorClick}></UserHead>
                    <Typography gutterBottom variant="h5" component="h2">
                        {props.title}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    );
};