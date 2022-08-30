import LatestNews from "./Latest";
import TrendingArticles from "./Trending";

const Home = () => {
  return (
    <section className="homepage">
      <h2>Latest news</h2>
      <LatestNews />
      <h2>Trending</h2>
      <TrendingArticles />
    </section>
  );
};
// gets article with latest date
// gets top 3 articles with most likes
export default Home;
