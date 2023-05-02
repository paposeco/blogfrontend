import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Comment from "../common/comment";

const SinglePost = function() {
  const location = useLocation();
  const postID = location.pathname.substring(12);
  const navigate = useNavigate();
  const [post, setPost] = useState();
  const [fetchingData, setFetchingData] = useState(true);
  const [showCommentBox, setShowCommentBox] = useState(false);

  const [readerUsername, setReaderUsername] = useState("");
  const [readerEmail, setReaderEmail] = useState("");
  const [comment, setComment] = useState("");
  const showbox = function() {
    setShowCommentBox(true);
  };
  useEffect(() => {
    const fetchData = async function() {
      try {
        const response = await fetch(
          `http://localhost.localdomain:5000/posts/${postID}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (response.status === 200) {
          const responseData = await response.json();
          setFetchingData(false);
          setPost(responseData);
        }
      } catch (err) { }
    };
    fetchData();
  }, [postID]);

  const handlerOfChange = function(event) {
    if (event.target.id === "readerusername") {
      setReaderUsername(event.target.value);
    } else if (event.target.id === "readeremail") {
      setReaderEmail(event.target.value);
    } else if (event.target.id === "commentcontent") {
      setComment(event.target.value);
    }
  };

  const handlerOfSubmit = async function(event) {
    event.preventDefault();
    let commentbody;
    if (readerEmail !== "") {
      commentbody = JSON.stringify({
        reader_username: readerUsername,
        reader_email: readerEmail,
        content: comment,
      });
    } else {
      commentbody = JSON.stringify({
        reader_username: readerUsername,
        content: comment,
      });
    }
    try {
      const response = await fetch(
        `http://localhost.localdomain:5000/posts/${postID}/newcomment`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: commentbody,
        }
      );
      if (response.status === 201) {
        navigate(`/blog/posts/${postID}`);
      }
    } catch (err) { }
  };

  if (fetchingData) {
    return <div>Fetching data</div>;
  } else {
    return (
      <div>
        <h2>{post.post.title}</h2>
        <p>{post.post.content}</p>

        <button onClick={showbox}>Add comment</button>
        {showCommentBox ? (
          <form onSubmit={handlerOfSubmit}>
            <label htmlFor="readerusername">Username:</label>
            <input
              id="readerusername"
              name="readerusername"
              type="text"
              onChange={handlerOfChange}
              required
              maxLength="50"
            />
            <label htmlFor="readeremail">E-mail (optional):</label>
            <input
              id="readerusername"
              name="readerusername"
              type="email"
              maxLength="50"
              onChange={handlerOfChange}
            />
            <label htmlFor="commentcontent">Comment:</label>
            <textarea
              id="commentcontent"
              name="commentcontent"
              maxLength="300"
              required
              onChange={handlerOfChange}
            />
            <button type="submit">Save</button>
          </form>
        ) : null}

        <h3>Comments</h3>
        <ul>
          {post.post.comments.map((comment) => (
            <Comment commentinfo={comment} />
          ))}
        </ul>
      </div>
    );
  }
};

export default SinglePost;
