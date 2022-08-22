const ArticleCard = ({title, author, topic, votes, comment_count, date}) => {
    const formatDate = date.slice(0, -14)
    return (
        <section className="article-card">
            <h2 className="article-title">{title}</h2>
            <span className="article-author-topic">BY: {author} , ON: {topic}</span> <br/>
            <span className="article-votes-comments">Votes: {votes}, Comments: {comment_count}</span> <br/>
            <span className="article-date">{formatDate}</span>
        </section>
    )
}

export default ArticleCard;