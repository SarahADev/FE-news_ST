//import user, context, api
import { UserContext } from "../contexts/User";
import { useContext, useState } from "react";
import { postArticleComment } from "../api";

const PostComment = ({ article_id, setArticleCommentList }) => {
  const { user, setUser } = useContext(UserContext);
  const [newComment, setNewComment] = useState("");
  const [err, setErr] = useState(null);
  const [postedComment, setPostedComment] = useState(0);
  const [postSuccess, setPostSuccess] = useState(null);

  const handleSubmit = (e) => {
    setNewComment("");
    setErr(null);
    setPostSuccess(null);
    e.preventDefault();
    postArticleComment(article_id, user, newComment)
      .then(({ addedComment }) => {
        setArticleCommentList((currArticleCommentList) => {
          return [addedComment, ...currArticleCommentList];
        });
        setPostedComment((currPostedComment) => {
          return currPostedComment + 1;
        });
        setPostSuccess(addedComment.body);
      })
      .catch(() => {
        setErr(
          "Something went wrong... Please refresh the page and try again."
        );
      });
  };

  if (err) return <span className="comment-error">{err}</span>;
  return (
    <section>
      {postSuccess ? (
        <p className="success-post-count">
          Successfully posted {postedComment} comments
        </p>
      ) : null}
      <form onSubmit={handleSubmit} className="post-comment">
        <p className="user">{user} (you)</p>
        <textarea
          className="add-comment"
          name="comment"
          placeholder="Add a comment..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          required
        />
        <button type="submit" className="post-comment">Post Comment</button>
      </form>
    </section>
  );
};

export default PostComment;
