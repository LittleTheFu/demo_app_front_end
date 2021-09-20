import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import { MainFrame } from './MainFrame';
import { Login } from './page/LoginPage';
import { useDispatch, useSelector } from 'react-redux';
import { selectHintMsg, selectHintState } from './reducer/rootReducer';
import { RegisterPage } from './page/RegisterPage';
import { Snackbar } from '@material-ui/core';
import { CLOSE_HINT, SystemActionTypes } from './reducer/system/types';
import { Dispatch, ReactNode } from 'react';
import { ForgetPasswordPage } from './page/ForgetPasswordPage';
import { ResetPasswordPage } from './page/ResetPasswordPage';

export default function App() {
  const hintState = useSelector(selectHintState);
  const hintMsg = useSelector(selectHintMsg);

  const dispatch = useDispatch<Dispatch<SystemActionTypes>>();

  interface PrivateRouteProps {
    children: ReactNode;
    path: string;
  }

  const PrivateRoute = ({ children, ...rest }: PrivateRouteProps): JSX.Element => {
    return (
      <Route
        {...rest}
        render={(): React.ReactNode =>
          false ? (
            children
          ) : (
            <Redirect
              to={{
                pathname: '/login',
              }}
            />
          )
        }
      />
    );
  };

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
          <PrivateRoute path="/main">
            <MainFrame />
          </PrivateRoute>
        </Switch>
      </Router>
    </div>);
}
