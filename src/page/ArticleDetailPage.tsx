import React, { createContext, useEffect, useRef, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Article, ArticleComment, bookmarkArticle, createArticle, createComment, deleteArticle, getArticleById, getArticleComments, thumbArticle, unBookmarkArticle, unthumbArticle, updateArticle } from "../common/service";
import { useHistory, useLocation, useParams } from 'react-router-dom';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from '@material-ui/core';
import { CommentCard } from '../component/CommentCard';
import { EditCard } from '../component/EditCard';
import { ArticleCard } from '../component/ArticleCard';
import { getAllArticleUrl, getSharedUrl, getUserUrl } from '../common/UrlHelper';

const useStyles = makeStyles({
    root: {
        maxWidth: 345,
    },
});

export const ArticleDetail: React.FC = () => {
    const [article, setArticle] = useState<Article>(new Article());
    const [content, setContent] = useState('');
    const [comments, setComments] = useState<ArticleComment[]>([]);
    const [editFlag, setEditFlag] = useState(false);
    const [shareDialogOpen, setShareDialogOpen] = useState(false);

    const classes = useStyles();
    const history = useHistory();
    const location = useLocation();

    const { id } = useParams<{ id: string }>();

    const LikeClick = (id: number): void => {
        if (!article.thumbState) {
            thumbArticle(id, (data) => {
                console.log(data);
                setArticle({ ...article, ...data.data });
            });
        }
    }

    const UnlikeClick = (id: number): void => {
        if (article.thumbState) {
            unthumbArticle(id, (data) => {
                console.log(data);
                setArticle({ ...article, ...data.data });
            });
        }
    }

    const BookMarkClick = (id: number): void => {
        bookmarkArticle(id, (data) => {
            setArticle({...article, bookmarked: true});
            console.log(data);
        });
        console.log('Bookmark click : ' + id);
    }

    const UnBookMarkClick = (id: number): void => {
        unBookmarkArticle(id, (data) => {
            setArticle({...article, bookmarked: false});
            console.log(data);
        });
        console.log('UnBookMark click : ' + id);
    }

    const AuthorClick = (authorId: number): void => {
        history.push(getUserUrl(authorId));
        console.log("author clicked : " + authorId);
    }

    const ShareClick = (id: number): void => {
        setShareDialogOpen(true);
        console.log('share : ' + location.pathname);
    }

    const DeleteClick = (id: number): void => {
        deleteArticle(id, (data) => {
            console.log(data);
            history.push(getAllArticleUrl());
        })
    }

    const EditClick = (): void => {
        setEditFlag(true);
        console.log('edit click')
    }

    const AcceptClick = (title: string, content: string): void => {
        setEditFlag(false);
        updateArticle(article.id, title, content, (data) => {
            console.log(data);
            console.log('accpet click : ' + title + ' ' + content);
            setArticle({ ...article, title: title, content: content })
        });
    }

    const CancelClick = (): void => {
        setEditFlag(false);
        console.log('cancel click')
    }

    const CommitShare = (): void => {
        createArticle('I shared this!', getSharedUrl(location.pathname), (data) => {
            console.log(data);
            setShareDialogOpen(false);
        });
        console.log('commit share');
    }

    useEffect(() => {

        getArticleById(id, article => {
            setArticle(article.data);
        });

        getArticleComments(id, comments => {
            setComments(comments.data);
        })
    }, [id]);

    function handleSubmit(event: React.FormEvent<HTMLFormElement>): void {
        event.preventDefault();
        console.log(content);

        createComment(id, content, (oneCommentData) => {
            setComments([...comments, oneCommentData.data]);
        })
    }

    return (
        <div>
            {editFlag ?
                <EditCard
                    title={article.title}
                    content={article.content}
                    acceptClick={AcceptClick}
                    cancelClick={CancelClick} />
                :
                <ArticleCard
                    likeClick={() => { LikeClick(article.id) }}
                    unlikeClick={() => { UnlikeClick(article.id) }}
                    bookmarkClick={() => { BookMarkClick(article.id) }}
                    unbookmarkClick={() => { UnBookMarkClick(article.id) }}
                    authorClick={() => { AuthorClick(article.authorId) }}
                    deleteClick={() => { DeleteClick(article.id) }}
                    shareClick={() => { ShareClick(article.id) }}
                    editClick={EditClick}
                    id={article.id}
                    title={article.title}
                    content={article.content}
                    author={article.author}
                    authorIcon={article.authorIcon}
                    thumb={article.thumb}
                    thumbed={article.thumbState}
                    deletable={article.deletable}
                    editable={article.editable}
                    shareable={true}
                    bookmarded={article.bookmarked} />
            }

            {comments.map((comment: ArticleComment, index: number) => {
                return (
                    <CommentCard key={index}
                        content={comment.articleCommentContent}
                        author={comment.articleCommentUserName}
                        authorIcon={comment.articleCommentUserIcon}
                        authorClick={() => { AuthorClick(comment.articleCommentUserId) }}></CommentCard>
                );
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

            <Dialog
                open={shareDialogOpen}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{"Share?"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        {getSharedUrl(location.pathname)}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => { setShareDialogOpen(false) }} color="primary">
                        No
                    </Button>
                    <Button onClick={CommitShare} color="primary" autoFocus>
                        Yes
                    </Button>
                </DialogActions>
            </Dialog>
        </div>);
};