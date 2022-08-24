import { useState } from "react";
import { updateArticleVotes } from "../api";

const ArticleVote = ({article_id, votes}) => {
    const [optimisticArticleVote, setOptimisticArticleVote] = useState(0)

    const incrementArticleVote = () => {
        setOptimisticArticleVote((currArticleVote) => {
            return currArticleVote + 1
        })
        updateArticleVotes(article_id).catch(() => {
            setOptimisticArticleVote((currArticleVote) => {
                alert("Vote request failed, please try again.")
                return currArticleVote - 1
            })
        })
        
    }


    return (
        <button className="article-vote" disabled={optimisticArticleVote===1? true : false} onClick={() => {
            incrementArticleVote()
        }}> VOTES : {votes + optimisticArticleVote}</button>
    )
}

export default ArticleVote