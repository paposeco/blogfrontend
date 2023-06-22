import React from "react";
import { Link, useLocation } from "react-router-dom";

const Comment = function(props) {
  const location = useLocation();
  const editorOrBlog = location.pathname.includes("editor") ? true : false;

  return (
    <li className="list-group-item mb-2">
      {props.commentinfo.reader_email !== undefined ? (
        <p>
          <i className="las la-comment-alt"></i>
          <span> </span>
          <Link to={props.commentinfo.reader_email}>
            {props.commentinfo.reader_username}
          </Link>{" "}
          on {props.commentinfo.comment_timestamp} said:
        </p>
      ) : (
        <p>
          <i className="las la-comment-alt"></i>
          <span> </span>
          {props.commentinfo.reader_username} on{" "}
          {props.commentinfo.comment_timestamp} said:
        </p>
      )}
      <p className="px-2">{props.commentinfo.content}</p>
      {editorOrBlog ? (
        <button
          className="btn btn-secondary mb-2 mx-2"
          onClick={props.deleteComment}
          data-commentid={props.commentinfo._id}
        >
          <i className="las la-trash"></i>
        </button>
      ) : null}
    </li>
  );
};

export default Comment;
