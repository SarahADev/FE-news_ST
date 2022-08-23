import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { fetchArticleComments, fetchSingleArticle } from "../api";
import ArticleVote from "./ArticleVote";
import ArticleComments from "./ArticleComments";

const SingleArticle = () => {
  const { article_id } = useParams();
  const [singleArticle, setSingleArticle] = useState();
  const [articleCommentList, setArticleCommentList] = useState([]);
  const [err, setErr] = useState(null)

  useEffect(() => {
    setErr(null)
    fetchSingleArticle(article_id).then(({ article }) => {
      setSingleArticle(article);
    })
    .catch(() =>{
      setErr('Something went wrong...')
    })
    fetchArticleComments(article_id).then(({ comments }) => {
      setArticleCommentList(comments);
    })
    .catch(() => {
      setErr('Something went wrong...')
    })
  }, [article_id]);

  if(err) return <span> {err} </span>

  if (!singleArticle) {
    return <section className="single-article">Loading..</section>;
  }
  return (
    <section className="single-article">
      <h2>{singleArticle.title}</h2>
      <span>
        Author: {singleArticle.author}
        <br />
        Topic: {singleArticle.topic}
      </span>
      <p>{singleArticle.body}</p>
      <ArticleVote article_id={article_id} votes={singleArticle.votes} />
      <section className="comment-list">
        <h3>Comments:</h3>
        {articleCommentList.map(
          ({ comment_id, votes, created_at, author, body }) => {
            return (
              <ArticleComments
                key={comment_id}
                votes={votes}
                created_at={created_at}
                author={author}
                body={body}
              />
            );
          }
        )}
      </section>
    </section>
  );
};

export default SingleArticle;
