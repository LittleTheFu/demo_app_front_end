import { Box, Button, TextField } from "@material-ui/core";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import { Descendant } from "slate";
import { createArticle, ICreateArticleResponseData } from "../common/service";
import { getArticleUrl } from "../common/UrlHelper";
import { RichEditor } from "../component/RichEditor";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    title: {
      width: "100%",
    },
    box: {
      width: "80%",
      margin: "0 auto",
      paddingTop: 20,
      paddingBottom: 20,
    },
    button: {
      width: "100%",
    }
  })
);

export const NewArticlePage: React.FC = () => {
  const [title, setTitle] = useState("");
  const [richContent, setRichContent] = useState<Descendant[]>([
    {
      type: "paragraph",
      children: [
        {
          text: "A line of text in a paragraph.",
          bold: false,
          underline: false,
          italic: false,
        },
      ],
    },
  ]);
  const classes = useStyles();

  const [textObjects] = useState("");

  const history = useHistory();

  function handleSubmit(): void {
    const strContent = JSON.stringify(richContent);
    createArticle(title, strContent, (data: ICreateArticleResponseData) => {
      console.log(data);
      history.push(getArticleUrl(data.data.id));
    });
    console.log(textObjects);
  }

  return (
    <div>
      <Box className={classes.box}>
        <TextField
          className={classes.title}
          multiline={true}
          variant="outlined"
          onChange={(e): void => setTitle(e.target.value)}
        />
      </Box>

      <RichEditor
        readonly={false}
        content={richContent}
        onContentChange={(content) => {
          setRichContent(content);
          console.log(content);
        }}
      />

      <Box className={classes.box}>
        <Button
          className={classes.button}
          type="submit"
          variant="contained"
          color="primary"
          onClick={handleSubmit}
        >
          post
        </Button>
      </Box>
    </div>
  );
};
