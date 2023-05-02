import React from "react";
import { Link } from "react-router-dom";

const Post = function(props) {
  return (
    <div>
      <h2>
        <Link to={props.post.url}>{props.post.title}</Link>
      </h2>
      <p>{props.post.post_timestamp}</p>
      <p>{props.post.content}</p>
      <p>{props.post.comments.length} Comments</p>
    </div>
  );
};

export default Post;
