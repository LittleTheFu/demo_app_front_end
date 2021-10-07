import { Button, TextField } from "@material-ui/core";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import { UserHead } from "../component/UserHead";
import { createMail } from "../common/service";

interface stateType {
  id: number;
  icon: string;
  name: string;
}

export const NewMailPage: React.FC = () => {
  const [content, setContent] = useState("");
  const location = useLocation<stateType>();
  const { state } = location;

  const SendClick = (): void => {
    createMail(state.id, content, (data) => {
      console.log(data);
    });
  };

  return (
    <div>
      <UserHead userName={state.name} avatar={state.icon} />
      <TextField
        id="outlined-multiline-static"
        multiline
        rows={4}
        variant="outlined"
        onChange={(e): void => {
          setContent(e.target.value);
        }}
      />
      <Button
        onClick={SendClick}
        type="submit"
        variant="contained"
        color="primary"
      >
        reply
      </Button>
    </div>
  );
};
