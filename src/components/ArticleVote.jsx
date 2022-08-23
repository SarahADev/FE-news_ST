import { useState } from "react";
import { updateArticleVotes } from "../api";

const ArticleVote = ({article_id, votes}) => {
    console.log(article_id, votes, 'article id in Articlevote')
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
        <span className="article-vote" onClick={() => {
            incrementArticleVote()
        }}> VOTES : {votes + optimisticArticleVote}</span>
    )
}

export default ArticleVote