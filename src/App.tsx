import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import { MainFrame } from './MainFrame';
import { Login } from './page/LoginPage';
import { useDispatch, useSelector } from 'react-redux';
import { selectHintMsg, selectHintState, selectLoginState } from './reducer/rootReducer';
import { RegisterPage } from './page/RegisterPage';
import { Snackbar } from '@material-ui/core';
import { CLOSE_HINT, SET_CURRENT_USER, SystemActionTypes, UPDATE_LOGIN_STATE } from './reducer/system/types';
import { Dispatch, useEffect } from 'react';
import { ForgetPasswordPage } from './page/ForgetPasswordPage';
import { ResetPasswordPage } from './page/ResetPasswordPage';
import { PrivateRoute } from './component/PrivateRouter';
import { getLoginFlag, getUserIconFromCookie, getUserNameFromCookie } from './common/common';

export default function App() {
  const hintState = useSelector(selectHintState);
  const hintMsg = useSelector(selectHintMsg);
  // const isLogin = getLoginFlag();

  const dispatch = useDispatch<Dispatch<SystemActionTypes>>();

  useEffect(() => {
    dispatch({
      type: SET_CURRENT_USER,
      payload: {
        name: getUserNameFromCookie(),
        icon: getUserIconFromCookie(),
      }
    });
  }, []);

  return (
    <div>
      <Snackbar
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        open={hintState}
        autoHideDuration={2000}
        onClose={(): void => {
          dispatch({ type: CLOSE_HINT });
        }}
        message={hintMsg}
      />
      <Router>
        <Switch>
          <Route path="/login">
            <Login />
          </Route>
          <Route path='/register'>
            <RegisterPage />
          </Route>
          <Route path='/forget_password'>
            <ForgetPasswordPage />
          </Route>
          <Route path={'/reset/:code'}>
            <ResetPasswordPage />
          </Route>
          <PrivateRoute flag={getLoginFlag} path="/main">
            <MainFrame />
          </PrivateRoute>
        </Switch>
      </Router>
    </div>);
}
