import "./index.css";
import TopBar from "./components/topbar/TopBar";
import Home from "./pages/home/Home";
import Single from "./pages/single/Single";
import Write from "./pages/write/Write";
import Setting from "./pages/setting/Setting";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { ContextProvider, Context } from "./context/Context";
import axios from "axios";
import { useContext } from "react";

function App() {
  const { user } = useContext(Context);

  return (
    <ContextProvider>
      <Router className="App">
        <TopBar />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/register" element={user ? <Home /> : <Register />} />
          <Route path="/login" element={user ? <Home /> : <Login />} />
          <Route path="/write" element={user ? <Write /> : <Register />} />
          <Route path="/setting" element={user ? <Setting /> : <Register />} />
          <Route path="/post/:postId" element={<Single />} />
        </Routes>
      </Router>
    </ContextProvider>
  );
}

export default App;
