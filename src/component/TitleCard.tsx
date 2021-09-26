import React from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { UserHead } from "./UserHead";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    avatarContainer: {
      display: "tableCell",
      verticalAlign: "middle",
    },
    avatar: {
      height: 40,
      width: 40,
      display: "block",
      marginLeft: "auto",
      marginRight: "auto",
    },
    card: {
      padding: theme.spacing(1),
    },
    name: {
      textAlign: "center",
    },
    container: {
      display: "inline-block",
      verticalAlign: "middle",
    },
  })
);

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
    <Card>
      <CardActionArea onClick={props.textClick}>
        <CardContent>
          <div className={classes.container}>
            <UserHead
              size={50}
              userName={props.author}
              avatar={props.authorIcon}
              nameClick={props.authorClick}
              avatarClick={props.authorClick}
            />
          </div>
          <div className={classes.container}>
            <Typography gutterBottom variant="h5" component="h2">
              {props.title}
            </Typography>
          </div>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};
