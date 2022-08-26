import axios from "axios";

export const fetchArticles = (topic, sort, order) => {
  if (topic === "all") {
    return axios.get(`https://news-api-08-22.herokuapp.com/api/articles?sort_by=${sort}&&order=${order}`).then(
      (res) => {
        return res.data
      }
    );
  } else {
    return axios.get(
      `https://news-api-08-22.herokuapp.com/api/articles?topic=${topic}&&sort_by=${sort}&&order=${order}`
    ).then((res) => {
      return res.data
    });
  }
};

export const fetchTopics = () => {
  return axios
    .get("https://news-api-08-22.herokuapp.com/api/topics")
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      console.log(err);
    });
};

export const fetchSingleArticle = (article_id) => {
  return axios
    .get(`https://news-api-08-22.herokuapp.com/api/articles/${article_id}`)
    .then((res) => {
      return res.data;
    })
};


export const updateArticleVotes = (article_id) => {
  return axios
    .patch(`https://news-api-08-22.herokuapp.com/api/articles/${article_id}`, {
      inc_votes : 1
    })
    .then((res) => {
    })
};

export const fetchArticleComments = (article_id) => {
  return axios
    .get(`https://news-api-08-22.herokuapp.com/api/articles/${article_id}/comments?limit=100`)
    .then((res) => {
      return res.data;
    })
};

export const postArticleComment = (article_id, user, body) => {
  return axios
    .post(`https://news-api-08-22.herokuapp.com/api/articles/${article_id}/comments`, {
      username: user, body: body
    })
    .then((res) => {
      return res.data
    })
};

export const deleteArticleComment = (comment_id) => {
  return axios
  .delete(`https://news-api-08-22.herokuapp.com/api/comments/${comment_id}`)
  .then((res) => {
    return res.status
  })
}

export const fetchLatestArticle = () => {
  return axios
  .get(`https://news-api-08-22.herokuapp.com/api/articles?sort_by=created_at&&order=DESC`)
  .then((res) => {
    return res.data
  })
}

export const fetchTrendingArticles = () => {
  return axios.get(`https://news-api-08-22.herokuapp.com/api/articles?sort_by=votes&&order=DESC`)
  .then((res) => {
    return res.data
  })
}