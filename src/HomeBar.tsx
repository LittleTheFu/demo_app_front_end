import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import HomeIcon from '@material-ui/icons/Home';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { useHistory } from 'react-router-dom';
import { AccountBox, AddBox } from '@material-ui/icons';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
        },
        menuButton: {
            marginRight: theme.spacing(2),
        },
        title: {
            flexGrow: 1,
        },
    }),
);

export default function HomeBar() {
    const classes = useStyles();
    const history = useHistory();

    const loginClick = (): void => {
        history.push("/login");
        console.log("login clicked")
    };

    const homeClick = (): void => {
        history.push("/main/articles");
        console.log("home clicked")
    };

    const AddBoxClick = (): void => {
        history.push("/main/new_article");
        console.log("add box clicked")
    };

    const headClick = (): void => {
        history.push("/main/profile");
        console.log("profile clicked")
    }

    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                        <MenuIcon />
                    </IconButton>
                    <IconButton edge="start" onClick={homeClick} className={classes.menuButton} color="inherit" aria-label="menu">
                        <HomeIcon />
                    </IconButton>
                    <IconButton edge="start" onClick={AddBoxClick} className={classes.menuButton} color="inherit" aria-label="menu">
                        <AddBox />
                    </IconButton>
                    <IconButton edge="start" onClick={headClick} className={classes.menuButton} color="inherit" aria-label="menu">
                        <AccountBox />
                    </IconButton>
                    <Button color="inherit" onClick={loginClick}>Login</Button>
                </Toolbar>
            </AppBar>
        </div>
    );
}
