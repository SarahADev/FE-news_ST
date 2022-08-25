
const ArticleComments = ({votes, created_at, author, body}) => {
    const formatDate = created_at.slice(0, -14);
    return (
        <section className="comment-card">
            <p className="author">{author}</p>
            <p className="body">{body}</p>
            <p className="date">{formatDate}</p>
            <p className="votes">Votes: {votes}</p>
        </section>
    );
}

export default ArticleComments;