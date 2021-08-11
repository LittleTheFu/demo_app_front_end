import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Article, getArticleById, thumbArticle, unthumbArticle } from "./service";
import { useHistory, useParams } from 'react-router-dom';
import { ArticleCard } from './ArticleCard';

const useStyles = makeStyles({
    root: {
        maxWidth: 345,
    },
});

export const ArticleDetail: React.FC = () => {
    const [article, setArticle] = useState<Article>(new Article());
    const classes = useStyles();
    const history = useHistory();

    const { id } = useParams<{ id: string }>();

    const ThumbClick = (id: number): void => {
        if (article.thumbState) {
            unthumbArticle(id, (data) => {
                console.log(data);
                setArticle({ ...article, ...data.data });
            });
        } else {
            thumbArticle(id, (data) => {
                console.log(data);
                setArticle({ ...article, ...data.data });
            });
        }
        console.log("thumb/unthumb clicked : " + id)
    };

    const AuthorClick = (authorId: number): void => {
        history.push("/main/user/" + authorId);
        console.log("author clicked : " + authorId);
    }


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
        authorClick={() => {AuthorClick(article.authorId)}}
        id={article.id}
        title={article.title}
        content={article.content}
        author={article.author}
        thumb={article.thumb}
        thumbed={article.thumbState}></ArticleCard>);
};