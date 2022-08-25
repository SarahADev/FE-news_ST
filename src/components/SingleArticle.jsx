import { useParams } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { fetchArticleComments, fetchSingleArticle } from "../api";
import ArticleVote from "./ArticleVote";
import ArticleComments from "./ArticleComments";
import PostComment from "./PostComment";
import { UserContext } from "../contexts/User";
import DeleteComment from "./DeleteComment";

const SingleArticle = () => {
  const { user, setUser } = useContext(UserContext);
  const { article_id } = useParams();
  const [singleArticle, setSingleArticle] = useState();
  const [articleCommentList, setArticleCommentList] = useState([]);
  const [err, setErr] = useState(null);

  useEffect(() => {
    setErr(null);
    fetchSingleArticle(article_id)
      .then(({ article }) => {
        setSingleArticle(article);
      })
      .catch(() => {
        setErr("Something went wrong...");
      });
    fetchArticleComments(article_id)
      .then(({ comments }) => {
        setArticleCommentList(comments);
      })
      .catch(() => {
        setErr("Something went wrong...");
      });
  }, [article_id]);

  if (err) return <span> {err} </span>;

  if (!singleArticle) {
    return <section className="single-article">Loading..</section>;
  }
  return (
    <section className="single-article">
      <p className="topic">{singleArticle.topic}</p>
      <h2>{singleArticle.title}</h2>
      <p className="author">
        Author: {singleArticle.author}
      </p>
      <p className="body">{singleArticle.body}</p>
      <p className="date">{singleArticle.created_at.slice(0, -14)}</p>
      <ArticleVote article_id={article_id} votes={singleArticle.votes} />
      <section className="comment-list">
        <h3 className="comments">Comments:</h3>
        <PostComment
          article_id={article_id}
          setArticleCommentList={setArticleCommentList}
        />
        {articleCommentList.map(
          ({ comment_id, votes, created_at, author, body }) => {
            return (
              <section key={comment_id}>
                <ArticleComments
                  votes={votes}
                  created_at={created_at}
                  author={author}
                  body={body}
                />
                {author === user ? <DeleteComment setArticleCommentList={setArticleCommentList} comment_id={comment_id}/> : null}
                
              </section>
            );
          }
        )}
      </section>
    </section>
  );
};

export default SingleArticle;
