import "./post.css";
import { Link } from "react-router-dom";

export default function Post({ post }) {
  const publicFolder = "http://localhost:5000/images/";

  return (
    <div className="post">
      {post.photo && (
        <img
          className="post-img"
          src={publicFolder + post.photo}
          alt="gambar"
        />
      )}

      <div className="post-info">
        <div className="post-cats">
          {post.categories.map((category) => {
            <span className="post-cat">{category.name}</span>;
          })}
        </div>
        <Link to={`/post/${post._id}`}>
          <span className="post-title">{post.title}</span>
        </Link>
        <hr />
        <span className="post-date">
          {new Date(post.createdAt).toDateString()}
        </span>
      </div>
      <p className="post-description">{post.description}</p>
    </div>
  );
}
