import "./topbar.css";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { Context } from "../../context/Context";

export default function Topbar() {
  const { user, dispatch } = useContext(Context);
  const publicFolder = "http://localhost:5000/images/";

  // logout function
  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
  };

  return (
    <div className="top">
      <div className="top-left">
        <i className="top-icon fa-brands fa-square-facebook"></i>
        <i className="top-icon fa-brands fa-square-twitter"></i>
        <i className="top-icon fa-brands fa-square-github"></i>
      </div>
      <div className="top-center">
        <ul className="top-list">
          <li className="top-list-item">
            <Link to="/">HOME</Link>
          </li>
          <li className="top-list-item">
            <Link to="/">ABOUT</Link>
          </li>
          <li className="top-list-item">
            <Link to="/">CONTACT</Link>
          </li>
          <li className="top-list-item">
            <Link to="/write">WRITE</Link>
          </li>
          <li className="top-list-item" onClick={handleLogout}>
            <Link to="/">{user && "LOGOUT"}</Link>
          </li>
        </ul>
      </div>
      <div className="top-right">
        {user ? (
          <Link to="/setting">
            <img
              className="top-img"
              src={publicFolder + user.profilePic}
              alt="profile"
            />
          </Link>
        ) : (
          <ul className="top-list">
            <li className="top-list-item">
              <Link to="/login">LOGIN</Link>
            </li>
            <li className="top-list-item">
              <Link to="/register">REGISTER</Link>
            </li>
          </ul>
        )}
        <i className="top-icon-search fa-solid fa-magnifying-glass"></i>
      </div>
    </div>
  );
}
