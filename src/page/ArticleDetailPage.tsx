import React, { useEffect, useRef, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  addArticleTag,
  Article,
  ArticleComment,
  bookmarkArticle,
  createArticle,
  createComment,
  deleteArticle,
  deleteArticleTag,
  getArticleById,
  getArticleComments,
  thumbArticle,
  thumbComment,
  unBookmarkArticle,
  unthumbArticle,
  unThumbComment,
  updateArticle,
} from "../common/service";
import { useHistory, useLocation, useParams } from "react-router-dom";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  FormControl,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@material-ui/core";
import { EditCard } from "../component/EditCard";
import { ArticleCard } from "../component/ArticleCard";
import {
  getAllArticleUrl,
  getSharedUrl,
  getTagTitleUrl,
  getUserUrl,
} from "../common/UrlHelper";
import { RichEditor } from "../component/RichEditor";
import { Descendant } from "slate";
import { TagGroup } from "../component/TagGroup";
import { CommentGroup } from "../component/CommentGroup";

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  title: {
    width: "80%",
    margin: "auto",
    pad: 40,
  },
  tags: {
    width: "80%",
    margin: "auto",
    pad: 40,
  },
  comments: {
    width: "80%",
    margin: "auto",
    pad: 40,
  },
});

export const ArticleDetail: React.FC = () => {
  const ORDER_BY_DATE = "date";
  const ORDER_BY_THUMB = "thumb";

  const [commentOrderStatus, setCommentOrderStatus] = useState(ORDER_BY_DATE);
  const [article, setArticle] = useState<Article>(new Article());
  const [content, setContent] = useState("");
  const [comments, setComments] = useState<ArticleComment[]>([]);
  const [editFlag, setEditFlag] = useState(false);
  const [shareDialogOpen, setShareDialogOpen] = useState(false);
  const [newTag, setNewTag] = useState("");
  const [tags, setTags] = useState<string[]>([]);

  const [richContent, setRichContent] = useState<Descendant[]>([]);

  const [pageNum, setPageNum] = useState(0);
  const [pages, setPages] = useState(0);

  // const [savedTitle, setSavedTitle] = useState("");
  // const [savedContent, setSavedContent] = useState("");
  const savedTitle = useRef("");
  const savedContent = useRef("");

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
  };

  const UnlikeClick = (id: number): void => {
    if (article.thumbState) {
      unthumbArticle(id, (data) => {
        console.log(data);
        setArticle({ ...article, ...data.data });
      });
    }
  };

  const BookMarkClick = (id: number): void => {
    bookmarkArticle(id, (data) => {
      setArticle({ ...article, bookmarked: true });
      console.log(data);
    });
    console.log("Bookmark click : " + id);
  };

  const UnBookMarkClick = (id: number): void => {
    unBookmarkArticle(id, (data) => {
      setArticle({ ...article, bookmarked: false });
      console.log(data);
    });
    console.log("UnBookMark click : " + id);
  };

  const AuthorClick = (authorId: number): void => {
    history.push(getUserUrl(authorId));
    console.log("author clicked : " + authorId);
  };

  const ShareClick = (id: number): void => {
    setShareDialogOpen(true);
    console.log("share : " + location.pathname);
  };

  const DeleteClick = (id: number): void => {
    deleteArticle(id, (data) => {
      console.log(data);
      history.push(getAllArticleUrl());
    });
  };

  const EditClick = (): void => {
    // setSavedTitle(article.title);
    // setSavedContent(article.content);
    savedTitle.current = article.title;
    savedContent.current = article.content;

    setEditFlag(true);
    console.log("edit click");
  };

  const AcceptClick = (title: string, content: string): void => {
    setEditFlag(false);
    updateArticle(article.id, title, content, (data) => {
      console.log(data);
      console.log("accpet click : " + title + " " + content);
      setArticle({ ...article, title: title, content: content });
    });
  };

  const CancelClick = (): void => {
    setEditFlag(false);
    setArticle({ ...article, title: savedTitle.current, content: savedContent.current });

    const parsedObject = JSON.parse(savedContent.current);
    setRichContent(parsedObject);

    console.log("cancel click");
  };

  const CommitShare = (): void => {
    createArticle("I shared this!", getSharedUrl(location.pathname), (data) => {
      console.log(data);
      setShareDialogOpen(false);
    });
    console.log("commit share");
  };

  const ThumbCommentClick = (id: number): void => {
    thumbComment(id, (data) => {
      const new_comments = comments.map((c) => {
        if (c.id === id) {
          c.thumbState = true;
          c.articleCommentThumbNum += 1;
        }
        return c;
      });
      setComments(new_comments);
      console.log(data);
    });
  };

  const UnThumbCommentClick = (id: number): void => {
    unThumbComment(id, (data) => {
      const new_comments = comments.map((c) => {
        if (c.id === id) {
          c.thumbState = false;
          c.articleCommentThumbNum -= 1;
        }
        return c;
      });
      setComments(new_comments);
      console.log(data);
    });
  };

  const Change = (event: React.ChangeEvent<unknown>, page: number): void => {
    console.log("page change : " + page);
    getArticleComments(id, page, commentOrderStatus, (comments) => {
      setComments(comments.data.content);
      setPageNum(comments.data.pageNum);
      setPages(comments.data.pages);

      console.log("comments:");
      console.log(comments);
    });
  };

  const TagClick = (tag: string): void => {
    history.push(getTagTitleUrl(tag));
    console.log("tag clicked : " + tag);
  };

  const TagDeleteClick = (tag: string): void => {
    deleteArticleTag(article.id, tag, (data) => {
      const newTags = tags.filter((t) => {
        return t !== tag;
      });
      setTags(newTags);
    });
  };

  const TagAddClick = (tag: string): void => {
    addArticleTag(article.id, tag, (data) => {
      const newTags = [...tags, tag];
      setTags(newTags);
      console.log(data);
    });
  };

  useEffect(() => {
    getArticleById(id, (article) => {
      setArticle(article.data);

      const parsedObject = JSON.parse(article.data.content);
      setRichContent(parsedObject);

      setTags(article.data.tags);
      console.log(article);
    });
  }, [id]);

  useEffect(() => {
    getArticleComments(id, 1, commentOrderStatus, (comments) => {
      setComments(comments.data.content);
      setPageNum(comments.data.pageNum);
      setPages(comments.data.pages);

      console.log("comments:");
      console.log(comments);
    });
  }, [id, commentOrderStatus]);

  function handleSubmit(): void {
    // event.preventDefault();
    console.log(content);

    createComment(id, content, (oneCommentData) => {
      setComments([oneCommentData.data, ...comments]);
    });
  }

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setCommentOrderStatus(event.target.value as string);

    console.log(event.target.value);
  };

  return (
    <div>
      <Box className={classes.title}>
        <Typography align="center">
          <h1>{article.title}</h1>
        </Typography>
      </Box>

      {editFlag ? (
        <EditCard
          title={article.title}
          content={article.content}
          acceptClick={AcceptClick}
          cancelClick={CancelClick}
        />
      ) : (
        <ArticleCard
          likeClick={() => {
            LikeClick(article.id);
          }}
          unlikeClick={() => {
            UnlikeClick(article.id);
          }}
          bookmarkClick={() => {
            BookMarkClick(article.id);
          }}
          unbookmarkClick={() => {
            UnBookMarkClick(article.id);
          }}
          authorClick={() => {
            AuthorClick(article.authorId);
          }}
          deleteClick={() => {
            DeleteClick(article.id);
          }}
          shareClick={() => {
            ShareClick(article.id);
          }}
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
          bookmarded={article.bookmarked}
        />
      )}

      <RichEditor
        readonly={editFlag ? false : true}
        content={richContent}
        onContentChange={(content) => {
          setRichContent(content);
        }}
      />

      <Box className={classes.tags}>
        <TagGroup
          tags={tags}
          TagClick={TagClick}
          TagDeleteClick={article.editable ? TagDeleteClick : undefined}
        />

        <TextField id="tag" onChange={(e): void => setNewTag(e.target.value)} />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          onClick={() => {
            TagAddClick(newTag);
          }}
        >
          add tag
        </Button>
      </Box>

      <Box className={classes.comments}>
        <FormControl variant="filled">
          <Select
            labelId="demo-simple-select-filled-label"
            id="demo-simple-select-filled"
            value={commentOrderStatus}
            onChange={handleChange}
          >
            <MenuItem value={ORDER_BY_DATE}>按时间排序</MenuItem>
            <MenuItem value={ORDER_BY_THUMB}>按点赞排序</MenuItem>
          </Select>
        </FormControl>

        <CommentGroup
          pages={pages}
          pageNum={pageNum}
          comments={comments}
          authorClick={AuthorClick}
          thumbClick={ThumbCommentClick}
          unThumbClick={UnThumbCommentClick}
          onPageChange={Change}
        />

        <TextField
          multiline={true}
          id="standard-basic"
          label="comment"
          variant="outlined"
          onChange={(e): void => setContent(e.target.value)}
        />

        <Button
          type="submit"
          variant="contained"
          color="primary"
          onClick={handleSubmit}
        >
          post
        </Button>

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
            <Button
              onClick={() => {
                setShareDialogOpen(false);
              }}
              color="primary"
            >
              No
            </Button>
            <Button onClick={CommitShare} color="primary" autoFocus>
              Yes
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </div>
  );
};
