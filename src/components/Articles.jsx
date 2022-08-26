import { fetchArticles, fetchTopics } from "../api";
import ArticleCard from "./ArticleCard";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Pagination from "./Pagination";

const Articles = () => {

  const { topic_slug } = useParams();

  let navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [articles, setArticles] = useState([]);
  const [topics, setTopics] = useState([]);
  const [selectTopic, setSelectTopic] = useState(topic_slug);
  const [selectSortBy, setSelectSortBy] = useState("created_at");
  const [selectOrder, setSelectOrder] = useState("DESC");
  const [err, setErr] = useState(null);
  const [page, setPage] = useState(1)

  const handleSortSelect = (e) => {
    setSelectSortBy(e.target.value);
  };

  const handleOrderSelect = () => {
    if (selectOrder === "ASC") {
      setSelectOrder("DESC");
    } else {
      setSelectOrder("ASC");
    }
  };

  const handleTopicSelect = (e) => {
    let topicSlug = e.target.value;
    navigate(`/articles/topic/${topicSlug}`);
  };

  useEffect(() => {
    setSelectTopic(topic_slug);
  }, [topic_slug]);

  useEffect(() => {
    fetchTopics().then(({ topics }) => {
      setTopics(topics);
    });
  }, []);

  useEffect(() => {
    setLoading(true);
    fetchArticles(selectTopic, selectSortBy, selectOrder, page)
      .then(({ articles }) => {
        setLoading(false);
        setArticles(articles);
        window.scrollTo(0, 0)
      })
      .catch(() => {
        setErr("Oops! Something went wrong...");
      });
  }, [selectTopic, selectSortBy, selectOrder, page]);

  if (err)
    return (
      <section className="article-error">
        {" "}
        <p>{err}</p>{" "}
        <img
          src="https://cdn-icons-png.flaticon.com/512/3036/3036041.png"
          alt="Error message"
        />
      </section>
    );
  return (
    <section className="article-body">
      <section className="article-queries">
        <select
          className="dropdown-topic"
          onChange={handleTopicSelect}
          value={selectTopic}
        >
          <option key="header" disabled>
            Select Topic
          </option>
          <option value="all" key="All">
            All Topics
          </option>
          {topics.map(({ slug }, index) => {
            return (
              <option value={slug} key={index}>
                {slug}
              </option>
            );
          })}
        </select>
        <select className="dropdown-sortby" onChange={handleSortSelect} defaultValue="created_at">
          <option key="header" value="created_at" disabled>
            Sort
          </option>
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
        <button className="article-query-order" onClick={handleOrderSelect}>
          {selectOrder}
        </button>
      </section>
      {loading ? (
        <section className="loading">
          <h2>Loading</h2>
          <div className="loader"></div>
        </section>
      ) : null}
      {articles.map(
        ({
          article_id,
          title,
          author,
          topic,
          votes,
          comment_count,
          created_at,
        }, index) => {
          return (
            <ArticleCard
              even={index%2===0}
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
      <Pagination page={page} setPage={setPage}/>
    </section>
  );
};

export default Articles;
