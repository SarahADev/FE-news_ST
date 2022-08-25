import { useState } from "react";
import { deleteArticleComment } from "../api";
const DeleteComment = ({ setArticleCommentList, comment_id }) => {
  const [err, setErr] = useState(null);

  const handleDeleteComment = () => {
    deleteArticleComment(comment_id)
      .then(() => {
        setArticleCommentList((currArticleCommentList) => {
          let modifiedCommentList = [...currArticleCommentList];
          return modifiedCommentList.filter(
            (comment) => comment.comment_id !== comment_id
          );
        });
      })
      .catch((err) => {
        setErr(err.message);
      });
  };

  if (err) return <span>{err} </span>;
  return (
    <button className="delete-comment" onClick={handleDeleteComment}>
      DELETE
    </button>
  );
};

export default DeleteComment;
