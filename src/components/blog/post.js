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
  }, [post, props]);

  return (
    <div className="mb-4">
      <h2>
        <Link to={props.post.url}>{props.post.title}</Link>
      </h2>
      <p className="text-muted">
        <i className="las la-calendar"></i>
        <span> </span>Published {props.post.post_timestamp}
      </p>
      {post.map((element) => (
        <p>{element}</p>
      ))}
      <p className="text-muted">
        <i className="las la-comment"></i>
        <span> </span>
        {props.post.comments.length} Comments
      </p>
    </div>
  );
};

export default Post;
