import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Comment from "../common/comment";
import RotatingOrange from "../common/orange";
import { v4 as uuidv4 } from "uuid";

const PostOnEditor = function() {
  const location = useLocation();
  const navigate = useNavigate();
  const [postID, setPostID] = useState(location.pathname.substring(14));
  const [postContent, setPostContent] = useState();
  const [dataFetched, setDataFetched] = useState(false);
  const [comments, setComments] = useState([]);
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [fullPost, setFullPost] = useState();

  useEffect(() => {
    setPostID(location.pathname.substring(14));
  }, [location]);

  useEffect(() => {
    if (fullPost !== undefined) {
      document.title = fullPost.title + " | More Oranges ";
    }
  }, [fullPost]);

  const createParagraphs = function(postcontent) {
    const paragraphArray = postcontent.content.split("\n");
    let cleanArray = [];
    paragraphArray.forEach((element) => {
      if (element !== "") {
        cleanArray.push(element);
      }
    });
    setPostContent(cleanArray);
  };

  useEffect(() => {
    const fetchData = async function() {
      try {
        const response = await fetch(
          `https://blogapi-production-7add.up.railway.app/editor/posts/${postID}`,
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
          setComments(responseData.comments);
          createParagraphs(responseData.post);
          setFullPost(responseData.post);
        }
      } catch (err) { }
    };
    if (!dataFetched) {
      fetchData();
      setDataFetched(true);
    }
  }, [dataFetched, postID, token]);

  const deleteComment = async function(commentid) {
    const fetchData = async function() {
      try {
        const response = await fetch(
          `https://blogapi-production-7add.up.railway.app/editor/posts/${postID}`,
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
          setComments(responseData.comments);
          createParagraphs(responseData.post);
          setFullPost(responseData.post);
        }
      } catch (err) { }
    };

    if (commentid !== undefined) {
      try {
        const response = await fetch(
          `https://blogapi-production-7add.up.railway.app/editor/posts/${postID}/comments/${commentid}`,
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
      } catch (err) { }
    }
  };

  const editBlogPost = function() {
    navigate(`/editor/posts/${postID}/edit`, { state: fullPost });
  };

  const deleteBlogPost = async function() {
    try {
      const response = await fetch(
        `https://blogapi-production-7add.up.railway.app/editor/posts/${postID}`,
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
    } catch (err) { }
  };

  if (postContent === undefined) {
    return <RotatingOrange />;
  } else {
    return (
      <div className="d-flex flex-column flex-grow-1 mb-5">
        <div className="flex-grow-1">
          <h2>{fullPost.title}</h2>
          <div>
            <p className="text-muted">
              <i className="las la-calendar"></i>
              <span> </span>
              {fullPost.status} {fullPost.post_timestamp}
            </p>
          </div>
          {postContent.map((para) => (
            <p key={uuidv4()}>{para}</p>
          ))}
          <button onClick={editBlogPost} className="btn btn-primary text-white">
            Edit post
          </button>
          <button
            onClick={deleteBlogPost}
            className="btn btn-primary mx-2 text-white"
          >
            Delete post
          </button>
        </div>
        <div>
          <h3 className="mt-4 mb-4">Comments</h3>
          {comments.length === 0 ? <p>No comments yet.</p> : null}
          <ul className="list-group-flush">
            {comments.map((comment) => (
              <div key={uuidv4()}>
                <Comment commentinfo={comment} deleteComment={deleteComment} />
              </div>
            ))}
          </ul>
        </div>
      </div>
    );
  }
};

export default PostOnEditor;
