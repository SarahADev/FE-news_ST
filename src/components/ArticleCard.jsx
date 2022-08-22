import { useNavigate } from "react-router-dom";

const ArticleCard = ({
  article_id,
  title,
  author,
  topic,
  votes,
  comment_count,
  date,
}) => {
  const formatDate = date.slice(0, -14);
  let navigate = useNavigate();
  const handleView = (article_id) => {
    navigate(`/article/${article_id}`);
  };
  return (
    <section className="article-card">
      <h2 className="article-title">{title}</h2>
      <span className="article-author-topic">
        BY: {author} , ON: {topic}
      </span>{" "}
      <br />
      <span className="article-votes-comments">
        Votes: {votes}, Comments: {comment_count}
      </span>{" "}
      <br />
      <span className="article-date">{formatDate}</span> <br />
      <button
        onClick={() => {
          handleView(article_id);
        }}
      >
        VIEW
      </button>
    </section>
  );
};

export default ArticleCard;
