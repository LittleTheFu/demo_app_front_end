import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import { useHistory, Link } from "react-router-dom";
import Container from "@material-ui/core/Container";
import {
  IAccessData,
  getCurrentUser,
  postLogin,
} from "../common/service";
import {
  getCurrentUserId,
  setLoginFlag,
  setToken,
  setTokenHead,
  setUserIconIntoCookie,
  setUserNameIntoCookie,
} from "../common/common";
import { useDispatch } from "react-redux";
import { SET_CURRENT_USER } from "../reducer/system/types";
import { getAllArticleUrl } from "../common/UrlHelper";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    main: {
      paddingTop: 250,
      alignItems: "center",
    },
    paper: {
      width: 230,
      verticalAlign: "middle",
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

export const Login: React.FC = () => {
  // const dispatch = useDispatch<ThunkDispatch<AppState, unknown, SystemActionTypes>>();
  // const isLogin = useSelector(selectLoginState);

  // const isLogin = useAppSelector(selectLoginState)
  // const dispatch = useAppDispatch();
  const dispatch = useDispatch();

  const [username, setUser] = useState("");
  const [password, setPassword] = useState("");

  const history = useHistory();
  const classes = useStyles({});

  const resolveData = (accessData: IAccessData): void => {
    console.log(accessData);
    console.log(accessData.data);

    setTokenHead(accessData.data.tokenHead);
    setToken(accessData.data.token);

    console.log("decoded code");
    console.log(getCurrentUserId());

    getCurrentUser((data) => {
      console.log("set avatar!!!!! " + data.data.icon);

      setUserNameIntoCookie(data.data.name);
      setUserIconIntoCookie(data.data.icon);

      dispatch({
        type: SET_CURRENT_USER,
        payload: {
          name: data.data.name,
          icon: data.data.icon,
        },
      });
     
      setLoginFlag(true);
      history.push(getAllArticleUrl());
    });
  };

  function handleSubmit(event: React.FormEvent<HTMLFormElement>): void {
    event.preventDefault();
    postLogin(username, password, resolveData);
  }

  return (
    <Container maxWidth="sm" className={classes.main}>
      <div className={classes.paper}>
        <form
          onSubmit={handleSubmit}
          className={classes.root}
          noValidate
          autoComplete="off"
        >
          <TextField
            id="name"
            label="user"
            onChange={(e): void => setUser(e.target.value)}
          />
          <TextField
            autoComplete="on"
            id="pswd"
            label="password"
            type="password"
            onChange={(e): void => setPassword(e.target.value)}
          />
          <Button type="submit" variant="contained" color="primary">
            login
          </Button>
          <Button
            component={Link}
            to="/register"
            type="submit"
            variant="contained"
            color="primary"
          >
            go register page
          </Button>
          <Button
            component={Link}
            to="/forget_password"
            type="submit"
            variant="contained"
            color="secondary"
          >
            I forgot password
          </Button>
        </form>
      </div>
    </Container>
  );
};