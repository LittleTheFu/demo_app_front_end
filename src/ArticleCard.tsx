import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
    root: {
        maxWidth: 345,
    },
});

interface ArticleCardProps {
    id: number;
    title: string;
    content: string;
    author: string;
    thumb: number;
    thumbed: boolean;
    textClick?: () => void;
    thumbClick?: () => void;
    authorClick?: () => void;
}

export const ArticleCard: React.FC<ArticleCardProps> = (props?: ArticleCardProps) => {


    const classes = useStyles();

    return (
        <Card className={classes.root}>
            <CardActionArea onClick={props?.textClick}>
                <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                        {props?.title}
                    </Typography>
                    <Typography onClick={props?.authorClick} gutterBottom variant="h5" component="h2">
                        {props?.author}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                        {props?.content}
                    </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions>
                <Button size="small" color="primary" onClick={props?.thumbClick}>
                    { ( props?.thumbed ? 'unThumb : ' : 'Thumb : ' ) + props?.thumb}
                </Button>
            </CardActions>
        </Card>
    );
};




