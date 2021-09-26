import { Pagination } from "@material-ui/lab";
import { ArticleComment } from "../common/service";
import { CommentCard } from "./CommentCard";

interface CommentGroupProps {
  comments: ArticleComment[];
  pages: number;
  pageNum: number;

  authorClick: (id: number) => void;
  thumbClick: (id: number) => void;
  unThumbClick: (id: number) => void;
  onPageChange: (event: React.ChangeEvent<unknown>, page: number) => void;
}

export const CommentGroup: React.FC<CommentGroupProps> = (
  props: CommentGroupProps
) => {
  const {
    comments,
    pages,
    pageNum,
    authorClick,
    thumbClick,
    unThumbClick,
    onPageChange,
  } = props;

  return (
    <div>
      <Pagination
        count={pages}
        page={pageNum}
        color="primary"
        onChange={onPageChange}
      />

      {comments.map((comment: ArticleComment, index: number) => {
        return (
          <CommentCard
            key={index}
            content={comment.articleCommentContent}
            author={comment.articleCommentUserName}
            authorIcon={comment.articleCommentUserIcon}
            date={comment.articleCommentDate}
            thumbState={comment.thumbState}
            thumbNum={comment.articleCommentThumbNum}
            authorClick={() => {
              authorClick(comment.articleCommentUserId);
            }}
            thumbClick={() => {
              thumbClick(comment.id);
            }}
            unThumbClick={() => {
              unThumbClick(comment.id);
            }}
          />
        );
      })}
    </div>
  );
};
