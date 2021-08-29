import React from 'react';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import MailIcon from '@material-ui/icons/Mail';
import { useHistory } from 'react-router-dom';
import MusicNoteIcon from '@material-ui/icons/MusicNote';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import EditIcon from '@material-ui/icons/Edit';
import PersonIcon from '@material-ui/icons/Person';
import SearchIcon from '@material-ui/icons/Search';
import AlbumIcon from '@material-ui/icons/Album';
import PeopleIcon from '@material-ui/icons/People';
import GitHubIcon from '@material-ui/icons/GitHub';
import Divider from '@material-ui/core/Divider';
import Badge from '@material-ui/core/Badge';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import { UserHead } from './UserHead';
import { NavListIconButton } from './NavListIconButton';
import { selectNameState, selectDrawerState, selectIconState } from '../reducer/rootReducer';
import { closeDrawer } from '../reducer/system/functions';
import { SystemActionTypes } from '../reducer/system/types';
import { useSelector, useDispatch } from 'react-redux';
import { Dispatch } from 'redux';
import HomeIcon from '@material-ui/icons/Home';
import { AccountBox, AddBox, Mail, People, Restore } from '@material-ui/icons';
import { getAllArticleUrl, getFriendUrl, getHistoryUrl, getMailUrl, getNewArticleUrl, getProfileUrl } from '../common/UrlHelper';



export const TemporaryDrawer: React.FC = () => {
    const dispatch = useDispatch<Dispatch<SystemActionTypes>>();
    
    const drawerState = useSelector(selectDrawerState);

    const headIcon = useSelector(selectIconState);
    const headName = useSelector(selectNameState);

    // const classes = useStyles({});
    const history = useHistory();

    const logoutClick = (): void => {
    };

    const peopleClick = (): void => {
    };

    const friendClick = (): void => {
        history.push(getFriendUrl());
    };

    const historyClick = (): void => {
        history.push(getHistoryUrl());
    };

    const mailClick = (): void => {
        history.push(getMailUrl());
    };

    const meClick = (): void => {
        history.push(getProfileUrl());
    };

    const newArticleClick = (): void => {
        history.push(getNewArticleUrl());
    };

    const allClick = (): void => {
        history.push(getAllArticleUrl());
    };

    const projectClick = (): void => {
    };

    return (
        <div>
            <Drawer
                anchor="left"
                open={drawerState}
                onClose={(): void => {
                    closeDrawer(dispatch);
                }}
            >
                <List>
                    <UserHead
                        padding={5}
                        avatar={headIcon}
                        userName={headName}
                        size={80}
                    ></UserHead>
                    <Divider></Divider>
                    <NavListIconButton msg={'all articles'} iconClick={allClick}>
                        <HomeIcon />
                    </NavListIconButton>

                    <NavListIconButton msg={'new article'} iconClick={newArticleClick}>
                        <Badge color="secondary" badgeContent={3} invisible={false}>
                            <AddBox />
                        </Badge>
                    </NavListIconButton>

                    <NavListIconButton msg={'me'} iconClick={meClick}>
                        <AccountBox />
                    </NavListIconButton>

                    <NavListIconButton msg={'mail'} iconClick={mailClick}>
                        <Mail />
                    </NavListIconButton>

                    <NavListIconButton msg={'friend'} iconClick={friendClick}>
                        <People />
                    </NavListIconButton>

                    <NavListIconButton msg={'history'} iconClick={historyClick}>
                        <Restore />
                    </NavListIconButton>

                    <NavListIconButton msg={'logout'} iconClick={logoutClick}>
                        <ExitToAppIcon />
                    </NavListIconButton>
                </List>
            </Drawer>
        </div>
    );
};