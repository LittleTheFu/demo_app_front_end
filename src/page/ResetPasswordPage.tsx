import { Button, Container, createStyles, makeStyles, TextField, Theme } from "@material-ui/core";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { resetPassword } from "../common/service";

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
            // border: '1px solid #000',
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

export const ResetPasswordPage: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const { code } = useParams<{ code: string }>();
    const classes = useStyles({});

    const ApplyClick = () => {
        resetPassword(email, password, code, (data) => {
            console.log(data);
        });
    }

    return (
        <div className={classes.paper}>
            <Container maxWidth="sm" className={classes.main}>

                <TextField
                    id="name"
                    label="email"
                    onChange={
                        (e): void => setEmail(e.target.value)
                    }
                />

                <TextField
                    id="password"
                    label="password"
                    onChange={
                        (e): void => setPassword(e.target.value)
                    }
                />

                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    onClick={ApplyClick}>
                    submit
                </Button>
            </Container>
        </div>
    )
};