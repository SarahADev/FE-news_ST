import { fetchArticles } from "../api";
import ArticleCard from "./ArticleCard";
import { useEffect, useState } from "react";


const Articles = () => {
    const [articles, setArticles] = useState([])

    useEffect(() => {
        fetchArticles().then(({articles}) => {
            setArticles(articles)
        })
    }, [])
    return (
        <section className="article-list">
            {articles.map(({article_id, title, author, topic, votes, comment_count, created_at})=> {
                return (
                    <section className="article-list--article">
                        <ArticleCard
                        key={article_id}
                        title={title}
                        author={author}
                        topic={topic}
                        votes={votes}
                        comment_count={comment_count}
                        date={created_at}/>
                    </section>
                )
            })}
        </section>
    )
}

export default Articles;