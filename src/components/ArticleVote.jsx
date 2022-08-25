import { useState } from "react";
import { updateArticleVotes } from "../api";

const ArticleVote = ({ article_id, votes }) => {
  const [optimisticArticleVote, setOptimisticArticleVote] = useState(0);

  const incrementArticleVote = () => {
    setOptimisticArticleVote((currArticleVote) => {
      return currArticleVote + 1;
    });
    updateArticleVotes(article_id).catch(() => {
      setOptimisticArticleVote((currArticleVote) => {
        alert("Vote request failed, please try again.");
        return currArticleVote - 1;
      });
    });
  };

  return (
    <section className="article-votes">
      <button
        className="article-vote"
        disabled={optimisticArticleVote === 1 ? true : false}
        onClick={() => {
          incrementArticleVote();
        }}
      >
        +
      </button>
      <p>{votes + optimisticArticleVote} Votes</p>
    </section>
  );
};

export default ArticleVote;
