import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Post = function(props) {
  const [post, setPost] = useState([]);

  const createParagraphs = function(postcontent) {
    const paragraphArray = postcontent.content.split("\n");
    let cleanArray = [];
    paragraphArray.forEach((element) => {
      if (element !== "") {
        cleanArray.push(element);
      }
    });
    setPost(cleanArray);
  };

  useEffect(() => {
    if (post.length === 0) {
      createParagraphs(props.post);
    }
  }, []);
  return (
    <div>
      <h2>
        <Link to={props.post.url}>{props.post.title}</Link>
      </h2>
      <p>{props.post.post_timestamp}</p>
      {post.map((element) => (
        <p>{element}</p>
      ))}
      <p>{props.post.comments.length} Comments</p>
    </div>
  );
};

export default Post;
