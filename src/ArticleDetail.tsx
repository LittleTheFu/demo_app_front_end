import React, { createContext, useEffect, useRef, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Article, ArticleComment, createComment, getArticleById, getArticleComments, thumbArticle, unthumbArticle } from "./service";
import { useHistory, useParams } from 'react-router-dom';
import { ArticleCard } from './ArticleCard';
import { Button, TextField } from '@material-ui/core';

const useStyles = makeStyles({
    root: {
        maxWidth: 345,
    },
});

export const ArticleDetail: React.FC = () => {
    const [article, setArticle] = useState<Article>(new Article());
    const [content, setContent] = useState('');
    const [comments, setComments] = useState<ArticleComment[]>([]);
    // const textInput = useRef(null);

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
            setArticle(article.data);
        });

        getArticleComments(id, comments => {
            setComments(comments.data);
        })
    }, []);

    useEffect(() => {
    }, [id]);


    function handleSubmit(event: React.FormEvent<HTMLFormElement>): void {
        event.preventDefault();
        console.log(content);

        createComment(id, content, (comments) => {
            setComments(comments.data);
        })
    }

    return (
        <div>
            <ArticleCard
                thumbClick={() => { ThumbClick(article.id) }}
                authorClick={() => { AuthorClick(article.authorId) }}
                id={article.id}
                title={article.title}
                content={article.content}
                author={article.author}
                thumb={article.thumb}
                thumbed={article.thumbState}></ArticleCard>
                {comments.map((comment:ArticleComment,index: number) => {
                    return <h1>{comment.articleCommentContent}</h1>
                })}
            <form onSubmit={handleSubmit} noValidate autoComplete="off">
                <TextField
                    // inputRef={textInput}
                    multiline={true}
                    id="standard-basic"
                    label="comment"
                    variant="outlined"
                    onChange={(e): void => setContent(e.target.value)}
                />
                <Button type="submit" variant="contained" color="primary" >
                    post
                </Button>
            </form>
        </div>);
};