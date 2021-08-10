import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Article, getArticleById, thumbArticle } from "./service";
import { useParams } from 'react-router-dom';
import { ArticleCard } from './ArticleCard';

const useStyles = makeStyles({
    root: {
        maxWidth: 345,
    },
});

export const ArticleDetail: React.FC = () => {
    const [article, setArticle] = useState<Article>(new Article());
    const classes = useStyles();

    const { id } = useParams<{ id: string }>();

    const ThumbClick = (id: number): void => {
        thumbArticle(id, (data) => { console.log(data) });
        console.log("thumb clicked : " + id)
    };


    useEffect(() => {
        getArticleById(id, article => {
            // console.log('article');
            // console.log(article);
            setArticle(article.data);
        });
    }, []);

    useEffect(() => {
    }, [id]);



    return (<ArticleCard
        thumbClick={() => { ThumbClick(article.id) }}
        id={article.id}
        title={article.title}
        content={article.content}
        author={article.author}
        thumb={article.thumb}
        thumbed={article.thumbState}></ArticleCard>);
};