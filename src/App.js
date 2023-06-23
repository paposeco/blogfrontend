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
import Footer from "./components/common/footer";
import CustomLogo from "./components/common/customlogo";
import BlogTitle from "./components/common/blogtitle";
import CreateUser from "./components/editing/createuser";

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
    <div className="content pt-2 pb-2 min-vh-100 d-flex flex-column">
      <Navigation author={author} logged={logged} />
      <BlogTitle />
      <div className="mt-4 mx-2 flex-grow-1 d-flex flex-column insidecontent">
        <Routes>
          <Route path="/" element={<Blog />} />
          <Route path="/blog/:pagenumber" element={<Blog />} />
          <Route path="/blog/posts/:postid" element={<SinglePost />} />
          <Route path="/editor/posts" element={<EditorBlog />} />
          <Route path="/editor/posts/:postid" element={<PostOnEditor />} />
          <Route path="/editor/newpost" element={<NewPost />} />
          <Route path="/editor/login" element={<Login loggedin={loggedin} />} />
          <Route
            path="/editor/createuser"
            element={<CreateUser loggedin={loggedin} />}
          />
          <Route path="/editor/posts/:postid/edit" element={<EditPost />} />
          <Route
            path="/editor/logout"
            element={<Logout loggedout={loggedout} />}
          />
        </Routes>
      </div>
      <CustomLogo />
      <Footer />
    </div>
  );
}

export default App;
