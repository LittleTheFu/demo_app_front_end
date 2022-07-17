import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import {
  Bookmark,
  BookmarkBorder,
  Delete,
  Edit,
  Favorite,
  FavoriteBorder,
  Share,
} from "@material-ui/icons";
import { UserHead } from "./UserHead";
import { CommonButton } from "./CommonButton";

const useStyles = makeStyles({
  root: {
    maxWidth: "80%",
    margin: "auto",
  },
  title: {
    textAlign: "center",
    width: "80%",
    margin: "0 auto",
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

export const ArticleCard: React.FC<ArticleCardProps> = (
  props: ArticleCardProps
) => {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardActionArea onClick={props.textClick}>
        <CardContent>
          <h1 className={classes.title}>
            {props.title}
          </h1>
        </CardContent>
      </CardActionArea>
      <CardActions>
        {props.thumbed ? (
          <CommonButton
            visible={true}
            clickAction={props.unlikeClick}
            IconComponent={Favorite}
            count={props.thumb}
          />
        ) : (
          <CommonButton
            visible={true}
            clickAction={props.likeClick}
            IconComponent={FavoriteBorder}
            count={props.thumb}
          />
        )}
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

        {props.bookmarded ? (
          <CommonButton
            visible={true}
            clickAction={props.unbookmarkClick}
            IconComponent={Bookmark}
          />
        ) : (
          <CommonButton
            visible={true}
            clickAction={props.bookmarkClick}
            IconComponent={BookmarkBorder}
          />
        )}
        <UserHead
          size={50}
          userName={props.author}
          avatar={props.authorIcon}
          nameClick={props.authorClick}
          avatarClick={props.authorClick}
        ></UserHead>
      </CardActions>
    </Card>
  );
};
