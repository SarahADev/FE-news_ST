import { useEffect, useState } from "react";
import { fetchTrendingArticles } from "../api";
import { useNavigate } from "react-router-dom";

const TrendingArticles = () => {
  const [trending, setTrending] = useState([]);
  const [err, setErr] = useState(null);
  let navigate = useNavigate();

  const handleClick = (article_id) => {
    navigate(`/article/${article_id}`);
  };

  useEffect(() => {
    fetchTrendingArticles()
      .then(({ articles }) => {
        setTrending(articles.slice(0, 3));
      })
      .catch((err) => {
        setErr("Oops! Something went wrong...");
      });
  }, []);

  if (err) return <p className="trending-error">{err}</p>;
  if (!trending[0])
    return (
      <section className="loading">
        <h2>Loading</h2>
        <div className="loader"></div>
      </section>
    );
  return (
    <section className="trending-articles">
      {trending.map(({ article_id, title, author, topic, votes }) => {
        return (
          <article key={article_id} className='trending-article'>
            <p className="title" onClick={()=>{handleClick(article_id)}}>{title}</p>
            <p className="topic">{topic}</p>
            <p className="author">{author}</p>
            <p className="votes">Votes: {votes}</p>
          </article>
        );
      })}
    </section>
  );
};

export default TrendingArticles;
