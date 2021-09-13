import React from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import { CommonButton } from './CommonButton';
import { UserHead } from './UserHead';
import { Delete, Mail } from '@material-ui/icons';

const useStyles = makeStyles(() =>
    createStyles({
        card: {
            width: '100%',
        },
        item: {
            width: '100%',
        },
        date: {
            color: 'grey',
        },
        inputBox: {
            width: '100%',
        },
        postButton: {
            width: '100%',
        },
        deleteBtn: {
            border: '2px solid grey',
            display: 'inline',
        },
        contentNormal: {
            fontWeight: 'normal',
        },
        contentBold: {
            fontWeight: 'bold',
        },
    }),
);

interface ContentCardProps {
    content: string;
    username: string;
    avatar: string;
    canBeDeleted: boolean;
    boldText?: boolean;

    authorClick?: () => void;
    deleteClick: () => void;
    mailClick: () => void;
}

export const ContentCard: React.FC<ContentCardProps> = (props: ContentCardProps) => {
    const classes = useStyles({});

    const { authorClick, deleteClick, mailClick } = props;
    const { avatar, username, content, canBeDeleted, boldText } = props;


    return (
        <Card className={classes.card}>
            <Grid container>
                <Grid item xs={3} md={2} lg={1}>
                    <UserHead
                        size={80}
                        avatar={avatar}
                        userName={username}
                        nameClick={authorClick}
                        avatarClick={authorClick}
                    ></UserHead>
                </Grid>
                <Grid container item xs={9} md={10} lg={11}>
                    <div className={boldText ? classes.contentBold : classes.contentNormal}>{content}</div>
                    <Grid item xs={12} className={classes.date}>
                        <CommonButton IconComponent={Mail} clickAction={mailClick} />
                    </Grid>
                    <Grid item xs={12} className={classes.date}>
                        {canBeDeleted ?
                            <CommonButton IconComponent={Delete} clickAction={deleteClick} />
                            :
                            <div></div>}
                    </Grid>
                </Grid>
            </Grid>
        </Card>
    );
};

ContentCard.defaultProps = {
    boldText: false,
};