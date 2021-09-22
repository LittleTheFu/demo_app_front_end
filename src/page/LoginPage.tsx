import React, { Dispatch, useEffect, useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { useHistory, Link } from 'react-router-dom';
import Container from '@material-ui/core/Container';
import { IAccessData, getCurrentUser, getGreeting, postLogin } from '../common/service';
import { getCurrentUserId, setLoginFlag, setToken, setTokenHead, setUserIconIntoCookie, setUserNameIntoCookie } from '../common/common';
import { useDispatch, useSelector } from 'react-redux';
import { SET_CURRENT_USER, SystemActionTypes, UPDATE_LOGIN_STATE } from '../reducer/system/types';
import { getAllArticleUrl } from '../common/UrlHelper';
import { enableLoginFlag, selectLoginState, store, useAppDispatch, useAppSelector } from '../reducer/rootReducer';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        main: {
            paddingTop: 250,
            alignItems: 'center',
        },
        paper: {
            width: 230,
            verticalAlign: 'middle',
            marginLeft: 'auto',
            marginRight: 'auto',
            backgroundColor: theme.palette.background.paper,
            border: '1px solid #000',
            padding: theme.spacing(2, 4, 3),
        },
        root: {
            '& > *': {
                margin: theme.spacing(1),
                width: 200,
            },
        },
    }),
);

export const Login: React.FC = () => {
    // const dispatch = useDispatch<ThunkDispatch<AppState, unknown, SystemActionTypes>>();
    // const isLogin = useSelector(selectLoginState);

    // const isLogin = useAppSelector(selectLoginState)
    const dispatch = useAppDispatch();

    const [username, setUser] = useState('');
    const [password, setPassword] = useState('');

    const history = useHistory();
    const classes = useStyles({});

    // useEffect(() => {
    //     if (isLogin) {
    //         history.push(getAllArticleUrl());
    //     }
    // }, [isLogin]);

    const resolveData = (accessData: IAccessData): void => {
        console.log(accessData);
        console.log(accessData.data);

        setTokenHead(accessData.data.tokenHead);
        setToken(accessData.data.token);

        console.log('decoded code');
        console.log(getCurrentUserId());

        getCurrentUser((data) => {
            console.log('set avatar!!!!! ' + data.data.icon);

            setUserNameIntoCookie(data.data.name);
            setUserIconIntoCookie(data.data.icon);
            
            dispatch({
                type: SET_CURRENT_USER,
                payload: {
                    name: data.data.name,
                    icon: data.data.icon
                }
            });

            // dispatch({
            //     type: UPDATE_LOGIN_STATE,
            //     payload: {
            //         isLogin: true
            //     }
            // });
            // dispatch as ThunkDispatch<State, unknown, AnyAction>
            // dispatch(enableLoginFlag()).then(()=>{
            //     setLoginFlag(true);

            //     console.log('jump begin');
            //     history.push(getAllArticleUrl());
            //     console.log('jump end');
            // });
            setLoginFlag(true);
            history.push(getAllArticleUrl());
        });
    };

    function handleSubmit(event: React.FormEvent<HTMLFormElement>): void {
        event.preventDefault();
        postLogin(username, password, resolveData);

        // console.log(username);
        // console.log(password);
    }

    const grettings = (): void => {
        getGreeting((data: object) => { console.log(data) });
    };

    return (
        <Container maxWidth="sm" className={classes.main}>
            <Button onClick={grettings} color="secondary">greeting</Button>
            <div className={classes.paper}>
                <form onSubmit={handleSubmit} className={classes.root} noValidate autoComplete="off">
                    <TextField id="name" label="user" onChange={(e): void => setUser(e.target.value)} />
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
                    <Button component={Link} to="/register" type="submit" variant="contained" color="primary">
                        go register page
                    </Button>
                    <Button component={Link} to="/forget_password" type="submit" variant="contained" color="secondary">
                        I forgot password
                    </Button>
                </form>
            </div>
        </Container>
    );
};