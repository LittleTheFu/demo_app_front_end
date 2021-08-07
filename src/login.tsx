import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { useHistory, Link } from 'react-router-dom';
import Container from '@material-ui/core/Container';
import { AccessData, postLogin } from './service';

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
    const [username, setUser] = useState('');
    const [password, setPassword] = useState('');

    const history = useHistory();
    const classes = useStyles({});

    const resolveData = (data: AccessData): void => {
        console.log(data.accessToken);
    };

    function handleSubmit(event: React.FormEvent<HTMLFormElement>): void {
        event.preventDefault();
        postLogin(username, password, resolveData);

        // console.log(username);
        // console.log(password);
    }

    return (
        <Container maxWidth="sm" className={classes.main}>
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