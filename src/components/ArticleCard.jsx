import { useNavigate } from "react-router-dom";

const ArticleCard = ({
  article_id,
  title,
  author,
  topic,
  votes,
  comment_count,
  date,
  even
}) => {
  const formatDate = date.slice(0, -14);
  let navigate = useNavigate();
  
  const handleView = (article_id) => {
    navigate(`/article/${article_id}`);
  };
  return (
    <section className={even ? 'article-card' : 'article-card alternate'}>
      <h2 className="article-title">{title}</h2>
      <p className="article-author-topic">
        <span>BY:</span> {author}  <span>ON:</span> {topic}
      </p>
      <p className="article-votes-comments">
        <span>Votes:</span> {votes} <span>Comments:</span> {comment_count}
      </p>
      <p className="article-date">{formatDate}</p>
      <button
        onClick={() => {
          handleView(article_id);
        }}
      >
        View Article
      </button>
    </section>
  );
};

export default ArticleCard;
