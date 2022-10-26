import SideBar from "../../components/sidebar/SideBar";
import "./setting.css";
import { useContext, useState } from "react";
import { Context } from "../../context/Context";
import axios from "axios";

export default function Setting() {
  const { user, dispatch } = useContext(Context);
  const [file, setFile] = useState(null);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const publicFolder = "http://localhost:5000/images/";

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({ type: "UPDATE_START" });
    const updatedUser = {
      userId: user._id,
      username,
      email,
      password,
    };
    if (file) {
      const data = new FormData();
      const filename = Date.now() + file.name;
      data.append("name", filename);
      data.append("file", file);
      updatedUser.profilePic = filename;

      try {
        await axios.post("/upload", data);
      } catch (err) {
        setError(true);
      }
    }
    try {
      const res = await axios.put("/users/" + user._id, updatedUser);
      dispatch({ type: "UPDATE_SUCCESS", payload: res.data });
      setSuccess(true);
    } catch (err) {
      dispatch({ type: "UPDATE_ERROR" });
      setError(true);
    }
  };

  return (
    <div className="setting">
      <div className="setting-wrapper">
        <div className="setting-title">
          <span className="setting-title-update">Update Your Account</span>
          <span className="setting-title-delete">Delete Account</span>
        </div>
        <form className="setting-form" onSubmit={handleSubmit}>
          <label>Profile Picture</label>
          <div className="setting-form-profile">
            <img
              className="setting-profile-img"
              src={
                file
                  ? URL.createObjectURL(file)
                  : publicFolder + user.profilePic
              }
              alt="profile"
            />
            <label htmlFor="file-input">
              <i className="setting-profile-icon far fa-user-circle"></i>
            </label>
            <input
              type="file"
              id="file-input"
              style={{ display: "none" }}
              onChange={(e) => setFile(e.target.files[0])}
            />
          </div>
          <label>Username</label>
          <input
            type="text"
            placeholder={user.username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <label>E-mail</label>
          <input
            type="email"
            placeholder={user.email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <label>Password</label>
          <input
            type="password"
            placeholder="Input password here..."
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button className="setting-submit" type="submit">
            Update
          </button>
          {success && (
            <span className="update-alert-sucess">Update Successful!</span>
          )}
          {error && (
            <span
              className="update-alert-error"
              style={{ color: "red", marginTop: "8px" }}
            >
              Something went wrong!
            </span>
          )}
        </form>
      </div>
      <SideBar />
    </div>
  );
}
