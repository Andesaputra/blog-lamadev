import "./register.css";
import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

export default function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(false);
    try {
      const res = await axios.post("/auth/register", {
        username,
        email,
        password,
      });
      res.data && window.location.replace("/login");
    } catch (err) {
      setError(true);
    }
  };

  return (
    <div className="register">
      <span className="register-title">Create New Account</span>
      <form className="register-form" onSubmit={handleSubmit}>
        <label>Username</label>
        <input
          type="text"
          placeholder="Enter your username..."
          className="register-input"
          onChange={(e) => setUsername(e.target.value)}
        />
        <label>Email</label>
        <input
          type="text"
          placeholder="Enter your email..."
          className="register-input"
          onChange={(e) => setEmail(e.target.value)}
        />
        <label>Password</label>
        <input
          type="password"
          placeholder="Enter your password..."
          className="register-input"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="register-button" type="submit">
          Register
        </button>
        {error && (
          <span style={{ color: "red", marginTop: "8px" }}>
            Something went wrong!
          </span>
        )}
      </form>
      <div className="register-login-form">
        <span className="register-login-title">have an account?</span>
        <button className="register-login-button">
          <Link to="/login">Log in</Link>
        </button>
      </div>
    </div>
  );
}
