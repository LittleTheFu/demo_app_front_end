import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { MainFrame } from "./MainFrame";
import { Login } from "./page/LoginPage";
import { useDispatch, useSelector } from "react-redux";
import { selectHintMsg, selectHintState } from "./reducer/rootReducer";
import { RegisterPage } from "./page/RegisterPage";
import { Snackbar } from "@material-ui/core";
import { useEffect } from "react";
import { ForgetPasswordPage } from "./page/ForgetPasswordPage";
import { ResetPasswordPage } from "./page/ResetPasswordPage";
import { PrivateRoute } from "./component/PrivateRouter";
import {
  getLoginFlag,
  getUserIconFromCookie,
  getUserNameFromCookie,
} from "./common/common";
import { closeHint, setCurrentUser } from "./reducer/system/functions";

export default function App() {
  const hintState = useSelector(selectHintState);
  const hintMsg = useSelector(selectHintMsg);
  const dispatch = useDispatch();

  useEffect(() => {
    setCurrentUser(dispatch, getUserNameFromCookie(), getUserIconFromCookie());
  }, [dispatch]);

  return (
    <div>
      <Snackbar
        anchorOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        open={hintState}
        autoHideDuration={2000}
        onClose={(): void => {
          closeHint(dispatch);
        }}
        message={hintMsg}
      />
      <Router>
        <Switch>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/register">
            <RegisterPage />
          </Route>
          <Route path="/forget_password">
            <ForgetPasswordPage />
          </Route>
          <Route path={"/reset/:code"}>
            <ResetPasswordPage />
          </Route>
          <PrivateRoute flagFunc={getLoginFlag} path="/main">
            <MainFrame />
          </PrivateRoute>
        </Switch>
      </Router>
    </div>
  );
}