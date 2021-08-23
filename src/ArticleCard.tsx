import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Delete } from '@material-ui/icons';
import { IconButton } from '@material-ui/core';
import { UserHead } from './userHead';

const useStyles = makeStyles({
    root: {
        maxWidth: 345,
    },
});

interface ArticleCardProps {
    id: number;
    title: string;
    content: string;
    author: string;
    authorIcon: string;
    thumb: number;
    thumbed: boolean;
    deletable: boolean;

    textClick?: () => void;
    thumbClick?: () => void;
    authorClick?: () => void;
    deleteClick?: () => void;
}

export const ArticleCard: React.FC<ArticleCardProps> = (props: ArticleCardProps) => {


    const classes = useStyles();

    return (
        <Card className={classes.root}>
            <CardActionArea onClick={props.textClick}>
                <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                        {props.title}
                    </Typography>
                    <UserHead userName={props.author} avatar={props.authorIcon}
                        nameClick={props.authorClick} avatarClick={props.authorClick}></UserHead>
                    <Typography variant="body2" color="textSecondary" component="p">
                        {props.content}
                    </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions>
                <Button size="small" color="primary" onClick={props.thumbClick}>
                    {(props.thumbed ? 'unThumb : ' : 'Thumb : ') + props.thumb}
                </Button>
                {
                    props.deletable ?
                        (<IconButton onClick={props.deleteClick}>
                            <Delete />
                        </IconButton>)
                        :
                        <div></div>
                }
            </CardActions>
        </Card>
    );
};




