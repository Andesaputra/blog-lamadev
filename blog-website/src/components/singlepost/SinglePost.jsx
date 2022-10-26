import axios from "axios";
import { useState, useEffect, useContext } from "react";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import "./singlepost.css";
import { Context } from "../../context/Context";

export default function SinglePost() {
  const location = useLocation();
  const path = location.pathname.split("/")[2];
  const [post, setPost] = useState({});
  const publicFolder = "http://localhost:5000/images/";
  const { user } = useContext(Context);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [updateMode, setUpdateMode] = useState(false);

  useEffect(() => {
    const getPost = async () => {
      const res = await axios.get("/posts/" + path);
      setPost(res.data);
      setTitle(res.data.title);
      setDescription(res.data.description);
    };
    getPost();
  }, [path]);

  const handleDelete = async () => {
    try {
      await axios.delete(`/posts/${post._id}`, {
        data: { username: user.username },
      });
      window.location.replace("/");
    } catch (err) {}
  };

  const handleUpdate = async () => {
    try {
      await axios.put(`/posts/${post._id}`, {
        username: user.username,
        title: title,
        description,
      });
      setUpdateMode(false);
    } catch (err) {}
  };

  return (
    <div className="singlepost">
      <div className="singlepost-wrapper">
        {post.photo && (
          <img
            className="singlepost-img"
            src={publicFolder + post.photo}
            alt="gambar"
          />
        )}
        {updateMode ? (
          <input
            type="text"
            value={title}
            className="singlepost-title-input"
            onChange={(e) => setTitle(e.target.value)}
            autoFocus
          ></input>
        ) : (
          <h1 className="singlepost-title">
            {title}
            {post.username === user?.username && (
              <div className="singlepost-edit">
                <i
                  className="singlepost-icon far fa-edit"
                  onClick={() => setUpdateMode(true)}
                ></i>
                <i
                  className="singlepost-icon far fa-trash-alt"
                  onClick={handleDelete}
                ></i>
              </div>
            )}
          </h1>
        )}
        <div className="singlepost-info">
          <span className="singlepost-autor">
            Autor:{" "}
            <Link to={`/?user=${post.username}`}>
              <b>{post.username}</b>
            </Link>
          </span>
          <span className="singlepost-date">
            {new Date(post.createdAt).toDateString()}
          </span>
        </div>
        {updateMode ? (
          <textarea
            className="singlepost-description-input"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        ) : (
          <p className="singlepost-description">{description}</p>
        )}
        {updateMode && (
          <button className="singlepost-button" onClick={handleUpdate}>
            Update
          </button>
        )}
      </div>
    </div>
  );
}
