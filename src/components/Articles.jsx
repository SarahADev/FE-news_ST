import { fetchArticles, fetchTopics } from "../api";
import ArticleCard from "./ArticleCard";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Articles = (article_id) => {
  let navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [articles, setArticles] = useState([]);
  const [topics, setTopics] = useState([]);
  const [selectTopic, setSelectTopic] = useState("All");

  const handleTopicSelect = (e) => {
    let topicSlug = e.target.value;
    setSelectTopic(topicSlug);
    if (topicSlug === "All") {
      navigate(`/articles`);
    } else {
      navigate(`/articles/${topicSlug}`);
    }
  };

  useEffect(() => {
    fetchTopics().then(({ topics }) => {
      setTopics(topics);
    });
  }, []);

  useEffect(() => {
    setLoading(true);
    fetchArticles(selectTopic).then(({ articles }) => {
      setLoading(false);
      setArticles(articles);
    });
  }, [selectTopic]);
  return (
    <section className="article-body">
      {loading ? <h2> Loading...</h2> : null}
      <section className="article-queries">
        <label className="article-query-topic" key="topicLabel">
          Select a Topic
          <select className="dropdown" onChange={handleTopicSelect}>
            <option value="All" key="All">
              All
            </option>
            {topics.map(({ slug }, index) => {
              return (
                <option value={slug} key={index}>
                  {slug}
                </option>
              );
            })}
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
              <ArticleCard
                key={article_id}
                article_id={article_id}
                title={title}
                author={author}
                topic={topic}
                votes={votes}
                comment_count={comment_count}
                date={created_at}
              />
          );
        }
      )}
    </section>
  );
};

export default Articles;
