import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import "./sidebar.css";

export default function SideBar() {
  const [category, setCategory] = useState([]);

  useEffect(() => {
    const getCategory = async () => {
      const res = await axios.get("/categories");
      setCategory(res.data);
    };
    getCategory();
  }, []);

  return (
    <div className="sidebar">
      <div className="sidebar-item">
        <span className="sidebar-title">ABOUT ME</span>
        <img
          src="https://themes-themegoods.b-cdn.net/grandblog/demo/wp-content/uploads/2015/11/aboutme.jpg"
          alt="sidebar"
        />
        <p>
          Laboris sunt aute cupidatat velit magna velit ullamco dolore mollit
          amet ex esse.Sunt eu ut nostrud id quis proident.
        </p>
      </div>

      <div className="sidebar-item">
        <span className="sidebar-title">CATEGORIES</span>
        <ul className="sidebar-list">
          {category.map((c) => (
            <Link to={`/?categories=${c.name}`} key={c._id}>
              <li className="sidebar-list-item">{c.name}</li>
            </Link>
          ))}
        </ul>
      </div>

      <div className="sidebar-item">
        <span className="sidebar-title">FOLLOW US</span>
      </div>

      <div className="sidebar-social">
        <i className="sidebar-icon fa-brands fa-square-facebook"></i>
        <i className="sidebar-icon fa-brands fa-square-twitter"></i>
        <i className="sidebar-icon fa-brands fa-square-github"></i>
      </div>
    </div>
  );
}
