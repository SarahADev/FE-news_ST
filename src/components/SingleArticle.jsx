import { useParams } from "react-router-dom"
import { useState, useEffect } from "react"
import { fetchSingleArticle } from "../api"
import ArticleVote from './ArticleVote'

const SingleArticle = () => {
    const {article_id} = useParams()
    const [singleArticle, setSingleArticle] = useState()

    useEffect(() => {
        fetchSingleArticle(article_id).then(({ article }) => {
          setSingleArticle(article)
        });
      }, [article_id]);

    if (! singleArticle) {
        return (<section className="single-article">Loading..</section>)
    }
    return (
        <section className="single-article">
            <h2>{singleArticle.title}</h2>
            <span>Author: {singleArticle.author}<br/>Topic: {singleArticle.topic}</span> 
            <p>{singleArticle.body}</p>
            <ArticleVote article_id={article_id} votes={singleArticle.votes}/>
        </section>
    )
}


export default SingleArticle