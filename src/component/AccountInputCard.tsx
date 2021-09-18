import { makeStyles, Theme, createStyles, Button, Container, TextField } from "@material-ui/core";
import { useState } from "react";

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

interface AccountInputCardProps {
    email: string;
    password: string;
    code: string;

    onEmailChange: (email: string) => void;
    onPasswordChange: (password: string) => void;
    applyClick: () => void;
}


export const AccountInputCard: React.FC<AccountInputCardProps> = (props: AccountInputCardProps) => {
    const {
        email,
        password,
        code,
        onEmailChange,
        onPasswordChange,
        applyClick } = props;

    const classes = useStyles({});

    return (
        <div className={classes.paper}>
            <Container maxWidth="sm" className={classes.main}>

                <TextField
                    id="name"
                    label="email"
                    onChange={
                        (e): void => onEmailChange(e.target.value)
                    }
                />

                <TextField
                    id="password"
                    label="password"
                    onChange={
                        (e): void => onPasswordChange(e.target.value)
                    }
                />

                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    onClick={applyClick}>
                    submit
                </Button>
            </Container>
        </div>
    )
};