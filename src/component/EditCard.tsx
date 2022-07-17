import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import { TextField } from "@material-ui/core";

const useStyles = makeStyles({
  root: {
    width: "80%",
    margin: "auto",
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
  const [content] = useState(props.content);

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardContent>
          <TextField
            id="title"
            label="title"
            defaultValue={props.title}
            onChange={(e): void => {
              setTitle(e.target.value);
            }}
          />
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button
          size="small"
          color="primary"
          onClick={() => {
            props.acceptClick(title, content);
          }}
        >
          accept
        </Button>
        <Button size="small" color="primary" onClick={props.cancelClick}>
          cancel
        </Button>
      </CardActions>
    </Card>
  );
};
