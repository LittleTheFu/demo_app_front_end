import React from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import { DeleteButton } from './DeleteButton';
import { UserHead } from './userHead';

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

    detailClick?: () => void;
    deleteClick: () => void;
    cardClick?: () => void;
}

export const ContentCard: React.FC<ContentCardProps> = (props: ContentCardProps) => {
    const classes = useStyles({});

    const { detailClick, deleteClick, cardClick } = props;
    const { avatar, username, content, canBeDeleted, boldText } = props;


    return (
        <Card className={classes.card} onClick={cardClick}>
            <Grid container>
                <Grid item xs={3} md={2} lg={1}>
                    <UserHead
                        size={80}
                        avatar={avatar}
                        userName={username}
                        nameClick={detailClick}
                        avatarClick={detailClick}
                    ></UserHead>
                </Grid>
                <Grid container item xs={9} md={10} lg={11}>
                    <div className={boldText ? classes.contentBold : classes.contentNormal}>{content}</div>
                    <Grid item xs={12} className={classes.date}>
                        {canBeDeleted ? <DeleteButton clickDelete={deleteClick}></DeleteButton> : <div></div>}
                    </Grid>
                </Grid>
            </Grid>
        </Card>
    );
};

ContentCard.defaultProps = {
    boldText: false,
};