import axios from "axios";
import { useContext } from "react";
import { useState } from "react";
import "./write.css";
import { Context } from "../../context/Context";

export default function Write() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState(null);
  const { user } = useContext(Context);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newPost = {
      username: user.username,
      title,
      description,
    };
    if (file) {
      const data = new FormData();
      const filename = Date.now() + file.name;
      data.append("name", filename);
      data.append("file", file);
      newPost.photo = filename;
      try {
        await axios.post("/upload", data);
      } catch (err) {
        console.log(err);
      }
    }
    try {
      const res = await axios.post("/posts", newPost);
      window.location.replace("/post/" + res.data._id);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="write">
      {file && (
        <img className="write-img" src={URL.createObjectURL(file)} alt="a" />
      )}
      <form className="write-form" onSubmit={handleSubmit}>
        <div className="write-formgroup formgroup-title">
          <input
            type="text"
            placeholder="title"
            className="write-input input-title"
            autoFocus={true}
            onChange={(e) => setTitle(e.target.value)}
          />
          <label htmlFor="file-input">
            <i className="write-icon fas fa-plus"></i>
          </label>
          <input
            type="file"
            id="file-input"
            style={{ display: "none" }}
            onChange={(e) => setFile(e.target.files[0])}
          />
        </div>

        <div className="write-formgroup">
          <textarea
            placeholder="Tell your story..."
            type="text"
            className="write-input input-text write-text"
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </div>

        <div className="write-formgroup formgroup-submit">
          <button className="write-submit" type="submit">
            Publish
          </button>
        </div>
      </form>
    </div>
  );
}
