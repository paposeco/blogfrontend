import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Comment from "../common/comment";

const SinglePost = function() {
  const location = useLocation();
  const postID = location.pathname.substring(12);
  const navigate = useNavigate();
  const [post, setPost] = useState([]);
  const [fullPost, setFullPost] = useState();
  const [comments, setComments] = useState([]);
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
          setComments(responseData.comments);
          createParagraphs(responseData.post);
          setFullPost(responseData.post);
        }
      } catch (err) { }
    };
    if (fetchingData) {
      fetchData();
    }
  }, [postID, fetchingData]);

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
        `http:localhost.localdomain:5000/posts/${postID}/newcomment`,
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
      <div className="d-flex flex-column flex-grow-1">
        <div className="flex-grow-1">
          <h2>{fullPost.title}</h2>
          <p className="text-muted">
            <i className="las la-calendar"></i>
            <span> </span>Published {fullPost.post_timestamp}
          </p>
          <div className="my-4">
            {post.map((para) => (
              <p>{para}</p>
            ))}
          </div>
        </div>
        <div>
          <button onClick={showbox} className="btn btn-primary">
            Add comment
          </button>
        </div>

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
        <h3 className="mt-4 mb-4">Comments</h3>
        <ul className="list-group-flush">
          {comments.map((comment) => (
            <Comment commentinfo={comment} />
          ))}
        </ul>
      </div>
    );
  }
};

export default SinglePost;
