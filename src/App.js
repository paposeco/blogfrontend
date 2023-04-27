import "./App.css";
//import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Blog from "./components/blog/blog.js";
import Post from "./components/blog/post.js";
import EditorPost from "./components/editing/post.js";
import NewPost from "./components/editing/newpost.js";
import Login from "./components/editing/login.js";
import EditPost from "./components/editing/editpost";
import EditorBlog from "./components/editing/index.js";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Blog />} />
      <Route path="/blog" element={<Blog />} />
      <Route path="/blog/post/:id" element={<Post />} />
      <Route path="/editor/posts" element={<EditorBlog />} />
      <Route path="/editor/posts/:id" element={<EditorPost />} />
      <Route path="/editor/newpost" element={<NewPost />} />
      <Route path="/editor/login" element={<Login />} />
      <Route path="/editor/posts/:postid" element={<EditPost />} />
    </Routes>
  );
}

export default App;
