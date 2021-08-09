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
    textClick?: () => void;
}

export const ArticleCard: React.FC<ArticleCardProps> = (props?: ArticleCardProps) => {


    const classes = useStyles();

    return (
        <Card className={classes.root}>
            <CardActionArea onClick={props?.textClick}>
                <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                        {props?.title + '  ' + 'by' + '  ' + props?.author}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                        {props?.content}
                    </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions>
                <Button size="small" color="primary">
                    {'thumb:' + props?.thumb}
                </Button>
            </CardActions>
        </Card>
    );
};




