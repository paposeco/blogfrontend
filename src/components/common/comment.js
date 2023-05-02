import React from "react";
import { Link, useLocation } from "react-router-dom";

const Comment = function(props) {
  const location = useLocation();
  const editorOrBlog = location.pathname.includes("editor") ? true : false;

  return (
    <li key={props.commentinfo._id}>
      {props.commentinfo.reader_email !== undefined ? (
        <p>
          <Link to={props.commentinfo.reader_email}>
            {props.commentinfo.reader_username}
          </Link>{" "}
          on {props.commentinfo.comment_timestamp} said:
        </p>
      ) : (
        <p>
          {props.commentinfo.reader_username} on{" "}
          {props.commentinfo.comment_timestamp} said:
        </p>
      )}
      <p>{props.commentinfo.content}</p>
      {editorOrBlog ? (
        <button
          onClick={props.deleteComment}
          data-commentid={props.commentinfo._id}
        >
          Delete comment
        </button>
      ) : null}
    </li>
  );
};

export default Comment;
