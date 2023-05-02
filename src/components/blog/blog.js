import React, { useEffect, useState } from "react";
import Post from "./post";

const Blog = function() {
  const [posts, setPosts] = useState([]);
  const [fetchfailed, setfetchfailed] = useState(false);

  useEffect(() => {
    const fetchData = async function() {
      try {
        const response = await fetch(
          "http://localhost.localdomain:5000/posts",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (response.status === 200) {
          const responseData = await response.json();
          setPosts(responseData.posts);
        }
      } catch (err) {
        setfetchfailed(true);
      }
    };
    fetchData();
  }, [posts]);
  if (fetchfailed) {
    return <div>Fetching failed.</div>;
  } else {
    return (
      <div>
        {posts.map((post) => (
          <Post post={post} />
        ))}
      </div>
    );
  }
};

export default Blog;
