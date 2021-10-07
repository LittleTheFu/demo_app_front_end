import React, { useState } from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { ISimpleData, postRegister } from "../common/service";
import { useHistory, Link } from "react-router-dom";
import Container from "@material-ui/core/Container";
import { validate } from "email-validator";
import {
  isValidPassowrd,
  getPassowrdHelpText,
  isValidEmail,
  getEmailHelpText,
} from "../common/common";
import { getLoginUrl } from "../common/UrlHelper";
import { useDispatch } from "react-redux";
import { SystemActionTypes } from "../reducer/system/types";
import { Dispatch } from "redux";
import { openHint } from "../reducer/system/functions";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    main: {
      paddingTop: 250,
    },
    paper: {
      width: 230,
      marginLeft: "auto",
      marginRight: "auto",
      backgroundColor: theme.palette.background.paper,
      border: "1px solid #000",
      padding: theme.spacing(2, 4, 3),
    },
    root: {
      "& > *": {
        margin: theme.spacing(1),
        width: 200,
      },
    },
  })
);

export const RegisterPage: React.FC = () => {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const dispatch = useDispatch<Dispatch<SystemActionTypes>>();

  const MAX_EMAIL_LEN = 30;

  const history = useHistory();
  const classes = useStyles({});

  const resolveData = (data: ISimpleData): void => {
    openHint(dispatch, data.message);
    console.log(data);
    history.push(getLoginUrl());
  };

  function isCorrectEmail(email: string): boolean {
    if (email.length > MAX_EMAIL_LEN) return false;

    return validate(email);
  }

  function handleSubmit(): void {
    if (!isValidPassowrd(password)) {
        openHint(dispatch, 'invalid password!');
        return;
    }

    if (!isCorrectEmail(email)) {
        openHint(dispatch, 'please check your email!');
        return;
    }

    postRegister(email, password, resolveData);
  }

  return (
    <Container maxWidth="sm" className={classes.main}>
      <div className={classes.paper}>
        <TextField
          autoComplete="on"
          error={!isValidEmail(email)}
          id="email"
          label="email"
          type="email"
          onChange={(e): void => setEmail(e.target.value)}
          helperText={getEmailHelpText()}
        />
        <TextField
          autoComplete="on"
          error={!isValidPassowrd(password)}
          id="pswd"
          label="password"
          type="password"
          onChange={(e): void => setPassword(e.target.value)}
          helperText={getPassowrdHelpText()}
        />
        <Button
          type="submit"
          variant="contained"
          color="secondary"
          onClick={handleSubmit}
        >
          register
        </Button>
        <Button
          component={Link}
          to="/login"
          type="submit"
          variant="contained"
          color="primary"
        >
          go login page
        </Button>
      </div>
    </Container>
  );
};
