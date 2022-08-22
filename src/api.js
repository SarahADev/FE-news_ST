export const fetchArticles = (topic) => {
  console.log(topic, "topic in api");
  if (topic === "All") {
    return fetch("https://news-api-08-22.herokuapp.com/api/articles").then(
      (res) => {
        return res.json();
      }
    );
  } else {
    return fetch(`https://news-api-08-22.herokuapp.com/api/articles?topic=${topic}`).then(
        (res) => {
          return res.json();
        }
      )
  }
};
