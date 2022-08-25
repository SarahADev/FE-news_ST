import { fetchArticles, fetchTopics } from "../api";
import ArticleCard from "./ArticleCard";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const Articles = () => {
  const { topic_slug } = useParams();

  let navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [articles, setArticles] = useState([]);
  const [topics, setTopics] = useState([]);
  const [selectTopic, setSelectTopic] = useState(topic_slug);
  const [selectSortBy, setSelectSortBy] = useState('created_at')
  const [selectOrder, setSelectOrder] = useState('DESC')
  const [err, setErr] = useState(null)

  const handleSortSelect = (e) => {
    setSelectSortBy(e.target.value)
  }

  const handleOrderSelect = () => {
    if(selectOrder==='ASC'){
      setSelectOrder('DESC')
    } else {
      setSelectOrder('ASC')
    }
  }

  const handleTopicSelect = (e) => {
    let topicSlug = e.target.value;
    navigate(`/articles/topic/${topicSlug}`);
  };

  useEffect(() => {
    setSelectTopic(topic_slug);
  }, [topic_slug])

  useEffect(() => {
    fetchTopics().then(({ topics }) => {
      setTopics(topics);
    });
  }, []);

  useEffect(() => {
    setLoading(true);
    fetchArticles(selectTopic, selectSortBy, selectOrder).then(({ articles }) => {
      setLoading(false);
      setArticles(articles);
    })
    .catch(()=>{
      setErr('Something went wrong...')
    })
  }, [selectTopic, selectSortBy, selectOrder]);

  if (err) return <span>{err}</span>
  return (
    <section className="article-body">
      {loading ? <h2> Loading...</h2> : null}
      <section className="article-queries">
        <label className="article-query-topic" key="topicLabel">
          Select a Topic
          <select className="dropdown" onChange={handleTopicSelect} value={selectTopic}>
            <option value="all" key="All">
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
        </label> <br/>
        <label className="aricle-query-sortby">
          Sort by:
          <select className="dropdown" onChange={handleSortSelect}>
          <option value="created_at" key="date">
              Date
            </option>
          <option value="title" key="title">
              Title
            </option>
            <option value="author" key="author">
              Author
            </option>
            <option value="topic" key="topic">
              Topic
            </option>
            <option value="votes" key="votes">
              Votes
            </option>
            <option value="comment_count" key="comment_count">
              Comments
            </option>
          </select>
        </label>
        <button className="article-query-order" onClick={handleOrderSelect}>{selectOrder}</button>
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
