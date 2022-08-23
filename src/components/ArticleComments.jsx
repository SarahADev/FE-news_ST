
const ArticleComments = ({votes, created_at, author, body}) => {
    const formatDate = created_at.slice(0, -14);
    return (
        <section className="comment-card">
            <span className="author">{author}</span> |
            <p className="body">{body}</p>
            <span className="date">{formatDate}</span> |
            <span className="votes">Votes: {votes}</span>
        </section>
    );
}

export default ArticleComments;