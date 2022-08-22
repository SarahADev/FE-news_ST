import axios from 'axios'

export const fetchArticles = (topic) => {
  if (topic === "All") {
    return fetch("https://news-api-08-22.herokuapp.com/api/articles").then(
      (res) => {
        return res.json();
      }
    );
  } else {
    return fetch(
      `https://news-api-08-22.herokuapp.com/api/articles?topic=${topic}`
    ).then((res) => {
      return res.json();
    });
  }
};

// export const fetchTopics = () => {
//   return fetch("https://news-api-08-22.herokuapp.com/api/topics").then(
//     (res) => {
//       return res.json();
//     }
//   );
// };

export const fetchTopics = () => {
  return axios
    .get("https://news-api-08-22.herokuapp.com/api/topics")
    .then((res) => {
        return res.data
    })
    .catch((err) => {
      console.log(err);
    });
};
