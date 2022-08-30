import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchLatestArticle } from "../api";

const LatestNews = () => {
  const [latest, setLatest] = useState(null);
  const [err, setErr] = useState(null);
  let navigate = useNavigate();

  const handleClick = (article_id) => {
    navigate(`/article/${article_id}`);
  };

  useEffect(() => {
    fetchLatestArticle()
      .then(({ articles }) => {
        setLatest(articles[0]);
      })
      .catch(() => {
        setErr("Oops! Something went wrong...");
      });
  }, []);

  if (err) return <p className="latest-error">{err}</p>;
  if (!latest)
    return (
      <section className="loading">
        <h2>Loading</h2>
        <div className="loader"></div>
      </section>
    );
  return (
    <section className="latest-news">
      <article>
        <h3 onClick={()=>{handleClick(latest.article_id)}}>{latest.title}</h3>
        <p>{latest.author}</p>
        <p>{latest.created_at.slice(0, -14)}</p>
      </article>
    </section>
  );
};

export default LatestNews;
