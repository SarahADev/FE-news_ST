import { fetchArticles } from "../api";
import ArticleCard from "./ArticleCard";
import { useEffect, useState } from "react";

const Articles = () => {
  const [articles, setArticles] = useState([]);
  const [selectTopic, setSelectTopic] = useState('All')

  const handleTopicSelect = (e) => {
    setSelectTopic(e.target.value)
  }

  useEffect(() => {
    fetchArticles(selectTopic).then(({ articles }) => {
      setArticles(articles);
    });
  }, [selectTopic]);
  return (
    <section className="article-list">
      <section className="article-queries">
        {/* change topic query to a map when possible, extract component */}
        <label className="article-query-topic">
          Select a Topic
          <select className="dropdown" onChange={handleTopicSelect}>
            <option value="All">All</option>
            <option value="coding">Coding</option>
            <option value="cooking">Cooking</option>
            <option value="football">Football</option>
          </select>
        </label>
      </section>
      {articles.map(
        ({
          article_id,
          title,
          author,
          topic,
          votes,
          comment_count,
          created_at,
        }) => {
          return (
            <section className="article-list--article">
              <ArticleCard
                key={article_id}
                title={title}
                author={author}
                topic={topic}
                votes={votes}
                comment_count={comment_count}
                date={created_at}
              />
            </section>
          );
        }
      )}
    </section>
  );
};

export default Articles;
