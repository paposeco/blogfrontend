import "./App.css";
import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Blog from "./components/blog/blog.js";
import SinglePost from "./components/blog/singlepost.js";
import PostOnEditor from "./components/editing/post.js";
import NewPost from "./components/editing/newpost.js";
import Login from "./components/editing/login.js";
import EditPost from "./components/editing/editpost";
import EditorBlog from "./components/editing/index.js";
import Navigation from "./components/common/header";
import Logout from "./components/editing/logout";

function App() {
  const [logged, setlogged] = useState(false);
  const [author, setAuthor] = useState(localStorage.getItem("author"));

  const loggedin = function() {
    setlogged(true);
    setAuthor(localStorage.getItem("author"));
  };
  const loggedout = function() {
    setlogged(false);
    setAuthor(null);
  };

  useEffect(() => {
    if (author !== null) {
      setlogged(true);
    }
  }, [author]);

  return (
    <div>
      <Navigation author={author} logged={logged} />
      <Routes>
        <Route path="/" element={<Blog />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/posts/:postid" element={<SinglePost />} />
        <Route path="/editor/posts" element={<EditorBlog />} />
        <Route path="/editor/posts/:postid" element={<PostOnEditor />} />
        <Route path="/editor/newpost" element={<NewPost />} />
        <Route path="/editor/login" element={<Login loggedin={loggedin} />} />
        <Route path="/editor/posts/:postid/edit" element={<EditPost />} />
        <Route
          path="/editor/logout"
          element={<Logout loggedout={loggedout} />}
        />
      </Routes>
    </div>
  );
}

export default App;
