import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Bookmark, BookmarkBorder, Delete, Edit, Favorite, FavoriteBorder, Share } from '@material-ui/icons';
import { IconButton } from '@material-ui/core';
import { UserHead } from './UserHead';

const useStyles = makeStyles({
    root: {
        maxWidth: 800,
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
    editable: boolean;
    shareable: boolean;
    bookmarded: boolean;

    textClick?: () => void;
    thumbClick?: () => void;
    likeClick?: () => void;
    unlikeClick?: () => void;
    authorClick?: () => void;
    deleteClick?: () => void;
    editClick?: () => void;
    shareClick?: () => void;
    bookmarkClick?: () => void;
    unbookmarkClick?: () => void;
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
                    {/* <Typography variant="body2" color="textSecondary" component="p">
                        {props.content}
                    </Typography> */}
                </CardContent>
            </CardActionArea>
            <CardActions>
                {
                    props.thumbed ?
                        <IconButton onClick={props.unlikeClick}>
                            <Favorite />
                            {props.thumb}
                        </IconButton>
                        :
                        <IconButton onClick={props.likeClick}>
                            <FavoriteBorder />
                            {props.thumb}
                        </IconButton>
                }
                {
                    props.shareable ?
                        <IconButton onClick={props.shareClick}>
                            <Share />
                        </IconButton>
                        :
                        <div></div>
                }
                {
                    props.deletable ?
                        (<IconButton onClick={props.deleteClick}>
                            <Delete />
                        </IconButton>)
                        :
                        <div></div>
                }
                {
                    props.editable ?
                        (<IconButton onClick={props.editClick}>
                            <Edit />
                        </IconButton>)
                        :
                        <div></div>
                }
                {
                    props.bookmarded ?
                        <IconButton onClick={props.unbookmarkClick}>
                            <Bookmark />
                        </IconButton>
                        :
                        <IconButton onClick={props.bookmarkClick}>
                            <BookmarkBorder />
                        </IconButton>
                }
            </CardActions>
        </Card>
    );
};




