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
import { selectDrawerState } from '../reducer/rootReducer';
import { closeDrawer } from '../reducer/system/functions';
import { SystemActionTypes } from '../reducer/system/types';
import { useSelector, useDispatch } from 'react-redux';
import { Dispatch } from 'redux'; 


export const TemporaryDrawer: React.FC = () => {
    const dispatch = useDispatch<Dispatch<SystemActionTypes>>();
    const drawerState = useSelector(selectDrawerState);
    // const classes = useStyles({});
    const history = useHistory();

    const logoutClick = (): void => {
    };

    const peopleClick = (): void => {
    };

    const meClick = (): void => {
    };

    const editClick = (): void => {
    };

    const passwordClick = (): void => {
    };

    const searchClick = (): void => {
    };

    const collectionsClick = (): void => {
    };

    const mailClick = (): void => {
    };

    const musicClick = (): void => {
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
                        avatar={'http://101.132.41.44:9000/mall/20210821/213.jpg'}
                        userName={'aaa'}
                        size={80}
                    ></UserHead>
                    <Divider></Divider>
                    <NavListIconButton msg={'music'} iconClick={musicClick}>
                        <MusicNoteIcon />
                    </NavListIconButton>

                    <NavListIconButton msg={'mail'} iconClick={mailClick}>
                        <Badge color="secondary" badgeContent={3} invisible={false}>
                            <MailIcon />
                        </Badge>
                    </NavListIconButton>

                    <NavListIconButton msg={'collections'} iconClick={collectionsClick}>
                        <AlbumIcon />
                    </NavListIconButton>

                    <NavListIconButton msg={'search'} iconClick={searchClick}>
                        <SearchIcon />
                    </NavListIconButton>

                    <NavListIconButton msg={'edit'} iconClick={editClick}>
                        <EditIcon />
                    </NavListIconButton>

                    <NavListIconButton msg={'change password'} iconClick={passwordClick}>
                        <VpnKeyIcon />
                    </NavListIconButton>

                    <NavListIconButton msg={'me'} iconClick={meClick}>
                        <PersonIcon />
                    </NavListIconButton>

                    <NavListIconButton msg={'community'} iconClick={peopleClick}>
                        <PeopleIcon />
                    </NavListIconButton>

                    <NavListIconButton msg={'source code'} iconClick={projectClick}>
                        <GitHubIcon />
                    </NavListIconButton>

                    <NavListIconButton msg={'logout'} iconClick={logoutClick}>
                        <ExitToAppIcon />
                    </NavListIconButton>
                </List>
            </Drawer>
        </div>
    );
};