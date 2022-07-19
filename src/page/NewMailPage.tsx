import { Box, Button, makeStyles, TextField } from "@material-ui/core";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import { UserHead } from "../component/UserHead";
import { createMail } from "../common/service";

interface stateType {
  id: number;
  icon: string;
  name: string;
}

const useStyles = makeStyles({
  typeBox: {
    width: "80%",
    margin: "auto",
  },
  typeText: {
    width: "100%",
  },
  replyButton: {
    width: "100%",
  },
});

export const NewMailPage: React.FC = () => {
  const [content, setContent] = useState("");
  const location = useLocation<stateType>();
  const { state } = location;

  const classes = useStyles();

  const SendClick = (): void => {
    createMail(state.id, content, (data) => {
      console.log(data);
    });
  };

  return (
    <div>
      <UserHead userName={state.name} avatar={state.icon} />
      <Box className={classes.typeBox}>
        <TextField
          className={classes.typeText}
          id="outlined-multiline-static"
          multiline
          rows={4}
          variant="outlined"
          onChange={(e): void => {
            setContent(e.target.value);
          }}
        />
        <Button
          className={classes.replyButton}
          onClick={SendClick}
          type="submit"
          variant="contained"
          color="primary"
        >
          reply
        </Button>
      </Box>
    </div>
  );
};
