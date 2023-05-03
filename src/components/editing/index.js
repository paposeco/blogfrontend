import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import PostListItem from "../common/postlistitem";

const Posts = function() {
  const [posts, setPosts] = useState([]);
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [fetchStatus, setFetchStatus] = useState(true);
  const [dataFetched, setDataFetched] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchPosts = async function() {
      try {
        const response = await fetch(
          "http://localhost.localdomain:5000/editor/posts",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.status === 200) {
          const responseData = await response.json();
          setPosts(responseData.posts);
        } else if (response.status === 401) {
          navigate("/editor/login");
        }
      } catch (err) {
        setFetchStatus(false);
      }
    };
    if (!dataFetched) {
      fetchPosts();
      setDataFetched(true);
    }
  }, [token, dataFetched, navigate]);

  return (
    <div>
      <Link to="/editor/newpost">New post</Link>
      <ul>
        {posts.map((post) => (
          <PostListItem postinfo={post} />
        ))}
      </ul>
    </div>
  );
};

export default Posts;
