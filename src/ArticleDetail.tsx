import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Article, getArticleById } from "./service";
import { useParams } from 'react-router-dom';
import { ArticleCard } from './ArticleCard';

const useStyles = makeStyles({
    root: {
        maxWidth: 345,
    },
});

export const ArticleDetail: React.FC = () => {
    const [article, setArticle] = useState<Article>(new Article);
    const classes = useStyles();
    // const { sumParams } = useParams() as {
    //     sumParams: string;
    // };
    const { id } = useParams<{ id: string }>();

    // const intId = parseInt(sumParams);

    useEffect(() => {
        getArticleById(id, article => {
            // console.log('article');
            // console.log(article);
            setArticle(article.data);
        });
    }, [id]);


    return (<ArticleCard id={article.id} title={article.title} content={article.content}
        author={article.author} thumb={article.thumb}></ArticleCard>);
};