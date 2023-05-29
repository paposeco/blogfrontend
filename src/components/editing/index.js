import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PostListItem from "../common/postlistitem";
import RotatingOrange from "../common/orange";
import { v4 as uuidv4 } from "uuid";

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
      setDataFetched(true);
      fetchPosts();
    }
  }, [token]);

  const gotoeditor = function(event) {
    navigate("/editor/newpost");
  };

  if (!fetchStatus) {
    return <RotatingOrange />;
  } else {
    return (
      <div>
        <button onClick={gotoeditor} className="btn btn-primary text-white">
          New blog post
        </button>
        <h3 className="mt-4">Blog posts:</h3>
        <ul className="list-group-flush">
          {posts.map((post) => (
            <div key={uuidv4()}>
              <PostListItem postinfo={post} />
            </div>
          ))}
        </ul>
      </div>
    );
  }
};

export default Posts;
