const ArticleCard = ({title, author, topic, votes, comment_count}) => {
    return (
        <section className="article-card">
            <h2 className="article-title">{title}</h2>
            <span className="article-author-topic">BY: {author} , ON: {topic}</span> <br/>
            <span className="article-votes-comments">Votes: {votes}, Comments: {comment_count}</span>
        </section>
    )
}

export default ArticleCard;