export const fetchArticles = () => {
    return fetch("https://news-api-08-22.herokuapp.com/api/articles").then(
      (res) => {
        return res.json();
      }
    );
  };