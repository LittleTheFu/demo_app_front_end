import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import HomeIcon from '@material-ui/icons/Home';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { useHistory } from 'react-router-dom';
import { AccountBox, AddBox, Bookmark, Mail, People, Restore, ExitToApp } from '@material-ui/icons';
import { getAllArticleUrl, getFavoriteUrl, getFriendUrl, getHistoryUrl, getLoginUrl, getMailUrl, getNewArticleUrl, getProfileUrl } from '../common/UrlHelper';
import { OPEN_DRAWER, SystemActionTypes, UPDATE_LOGIN_STATE } from '../reducer/system/types';
import { useDispatch } from 'react-redux';
import { Dispatch } from 'react';


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
    const dispatch = useDispatch<Dispatch<SystemActionTypes>>();
    const classes = useStyles();
    const history = useHistory();

    const logoutClick = (): void => {
        dispatch({
            type: UPDATE_LOGIN_STATE,
            payload: {
                isLogin: false
            }
        });
        // history.push(getLoginUrl());
        // console.log("login clicked");
    };

    const menuClick = (): void => {
        // openDrawer(dispatch);
        dispatch({ type: OPEN_DRAWER });
        console.log("menu clicked")
    };


    const homeClick = (): void => {
        history.push(getAllArticleUrl());
        console.log("home clicked")
    };

    const AddBoxClick = (): void => {
        history.push(getNewArticleUrl());
        console.log("add box clicked")
    };

    const headClick = (): void => {
        history.push(getProfileUrl());
        console.log("profile clicked")
    }

    const mailClick = (): void => {
        history.push(getMailUrl());
        console.log("mail clicked")
    }

    const friendClick = (): void => {
        history.push(getFriendUrl());
        console.log("friend clicked")
    }

    const historyClick = (): void => {
        history.push(getHistoryUrl());
        console.log("history clicked")
    }

    const favoriteClick = (): void => {
        history.push(getFavoriteUrl());
        console.log('favorite click');
    }

    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" onClick={menuClick} className={classes.menuButton} color="inherit" aria-label="menu">
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
                    <IconButton edge="start" onClick={mailClick} className={classes.menuButton} color="inherit" aria-label="menu">
                        <Mail />
                    </IconButton>
                    <IconButton edge="start" onClick={friendClick} className={classes.menuButton} color="inherit" aria-label="menu">
                        <People />
                    </IconButton>
                    <IconButton edge="start" onClick={historyClick} className={classes.menuButton} color="inherit" aria-label="menu">
                        <Restore />
                    </IconButton>
                    <IconButton edge="start" onClick={favoriteClick} className={classes.menuButton} color="inherit" aria-label="menu">
                        <Bookmark />
                    </IconButton>
                    <IconButton edge="start" onClick={logoutClick} className={classes.menuButton} color="inherit" aria-label="menu">
                        <ExitToApp />
                    </IconButton>
                </Toolbar>
            </AppBar>
        </div>
    );
}
