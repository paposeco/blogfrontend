import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Comment from "../common/comment";

const PostOnEditor = function() {
  let location = useLocation();
  const navigate = useNavigate();
  const [postID, setPostID] = useState("");
  const [postContent, setPostContent] = useState();
  const [token, setToken] = useState(localStorage.getItem("token"));

  useEffect(() => {
    setPostID(location.pathname.substring(14));
  }, [location]);

  const fetchData = async function() {
    const response = await fetch(
      `http://localhost.localdomain:5000/editor/posts/${postID}`,
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
      setPostContent(responseData);
    }
  };

  useEffect(() => {
    if (postID !== "") {
      fetchData();
    }
  }, [postID]);

  const deleteComment = async function(event) {
    if (event.target.dataset.commentid !== undefined) {
      const response = await fetch(
        `http://localhost.localdomain:5000/editor/posts/${postID}/comments/${event.target.dataset.commentid}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            token: token,
          }),
        }
      );
      if (response.status === 200) {
        fetchData();
      }
    }
  };

  const editBlogPost = function() {
    navigate(`/editor/posts/${postID}/edit`, { state: postContent });
  };

  const deleteBlogPost = async function() {
    const response = await fetch(
      `http://localhost.localdomain:5000/editor/posts/${postID}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          token: token,
        }),
      }
    );

    if (response.status === 200) {
      navigate("/editor/posts");
    }
  };
  // need to figure out how to keep blog content formatting

  //draft or publish selector
  //edit button

  if (postContent !== undefined) {
    return (
      <div>
        <div>
          <h2>{postContent.post.title}</h2>
          <div>
            <p>{postContent.post.post_timestamp}</p>
          </div>
          <p>{postContent.post.content}</p>
          <button onClick={editBlogPost}>Edit</button>
          <button onClick={deleteBlogPost}>Delete</button>
        </div>
        <div>
          <h3>Comments</h3>
          <ul>
            {postContent.post.comments.map((comment) => (
              <Comment commentinfo={comment} deleteComment={deleteComment} />
            ))}
          </ul>
        </div>
      </div>
    );
  } else {
    return <div>fetching data</div>;
  }
};

export default PostOnEditor;
