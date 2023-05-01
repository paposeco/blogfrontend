import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const Comment = function(props) {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const navigate = useNavigate();
  // const deleteComment = async function() {
  //   const response = await fetch(
  //     `http://localhost.localdomain:5000/editor/posts/${props.postid}/comments/${props.commentinfo._id}`,
  //     {
  //       method: "DELETE",
  //       headers: {
  //         "Content-Type": "application/json",
  //         Authorization: `Bearer ${token}`,
  //       },
  //       body: JSON.stringify({
  //         token: token,
  //       }),
  //     }
  //   );
  //   if (response.status === 200) {
  //     navigate(`/editor/posts/${props.postid}`);
  //   }
  // };

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
      <button
        onClick={props.deleteComment}
        data-commentid={props.commentinfo._id}
      >
        Delete comment
      </button>
    </li>
  );
};

export default Comment;
