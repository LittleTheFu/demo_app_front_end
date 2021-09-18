import { Button, Container, createStyles, Link, makeStyles, TextField, Theme } from "@material-ui/core";
import { useState } from "react";
import { wantResetPassword } from "../common/service";

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

export const ForgetPasswordPage: React.FC = () => {
    const [email, setEmail] = useState('');
    const [address, setAddress] = useState('');

    const classes = useStyles({});

    const ApplyClick = () => {
        wantResetPassword(email,
            (data) => {
                console.log(data);
                setAddress(data.data);
            });
    }

    return (
        <div>
            <Container maxWidth="sm" className={classes.main}>

                <TextField
                    id="name"
                    label="email"
                    onChange={
                        (e): void => setEmail(e.target.value)
                    }
                />

                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    onClick={ApplyClick}>
                    submit
                </Button>

                <h3>
                    you should click this address in your email,
                    it is rendered here just for debug
                </h3>

                <Link href={address}>
                    <h3>
                        {address}
                    </h3>
                </Link>


            </Container>

        </div>
    )
};