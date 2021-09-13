import React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import IconButton from '@material-ui/core/IconButton';
import RemoveCircleOutlineIcon from '@material-ui/icons/RemoveCircleOutline';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import { UserHead } from './UserHead';
import { UserDetail } from '../common/service';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        avatarContainer: {
            display: 'tableCell',
            verticalAlign: 'middle',
        },
        avatar: {
            height: 40,
            width: 40,
            display: 'block',
            marginLeft: 'auto',
            marginRight: 'auto',
        },
        card: {
            padding: theme.spacing(1),
        },
        name: {
            textAlign: 'center',
        },
        container: {
            display: 'inline-block',
            verticalAlign: 'middle',
        },
    }),
);

interface FollowerCardProps {
    user: UserDetail;

    followClick: () => void;
    unfollowClick: () => void;
    avatarClick: () => void;
}

export const FollowerCard: React.FC<FollowerCardProps> = (props: FollowerCardProps) => {
    const classes = useStyles({});

    const { user, followClick, unfollowClick, avatarClick } = props;
    const { icon, id, name, followed } = user;

    return (
        <Card>
            <div className={classes.container}>
                <UserHead
                    padding={5}
                    size={80}
                    avatar={icon}
                    userName={name}
                    avatarClick={avatarClick}
                    nameClick={avatarClick}
                    center={false}
                ></UserHead>
            </div>
            <div className={classes.container}>
                {followed ? (
                    <IconButton onClick={unfollowClick}>
                        <RemoveCircleOutlineIcon />
                        unfollow
                    </IconButton>
                ) : (
                    <IconButton onClick={followClick}>
                        <AddCircleOutlineIcon />
                        follow
                    </IconButton>
                )}
            </div>
        </Card>
    );
};