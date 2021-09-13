import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { Bookmark, BookmarkBorder, Delete, Edit, Favorite, FavoriteBorder, Share, TramRounded } from '@material-ui/icons';
import { UserHead } from './UserHead';
import { CommonButton } from './CommonButton';

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
                        <CommonButton
                            visible={true}
                            clickAction={props.unlikeClick}
                            IconComponent={Favorite}
                            count={props.thumb} />
                        :
                        <CommonButton
                            visible={true}
                            clickAction={props.likeClick}
                            IconComponent={FavoriteBorder}
                            count={props.thumb} />
                }
                <CommonButton
                    visible={props.shareable}
                    clickAction={props.shareClick}
                    IconComponent={Share}
                />

                <CommonButton
                    visible={props.deletable}
                    clickAction={props.deleteClick}
                    IconComponent={Delete}
                />

                <CommonButton
                    visible={props.editable}
                    clickAction={props.editClick}
                    IconComponent={Edit}
                />

                {
                    props.bookmarded ?
                        <CommonButton
                            visible={true}
                            clickAction={props.unbookmarkClick}
                            IconComponent={Bookmark}
                        />
                        :
                        <CommonButton
                            visible={true}
                            clickAction={props.bookmarkClick}
                            IconComponent={BookmarkBorder}
                        />
                }
            </CardActions>
        </Card>
    );
};