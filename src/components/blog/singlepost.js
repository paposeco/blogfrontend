import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Comment from "../common/comment";
import { v4 as uuidv4 } from "uuid";
import RotatingOrange from "../common/orange";

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
    if (fullPost !== undefined) {
      document.title = fullPost.title + " | More Oranges";
    }
  }, [fullPost]);

  useEffect(() => {
    const fetchData = async function() {
      try {
        const response = await fetch(
          `https://blogapi-production-7add.up.railway.app/posts/${postID}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (response.status === 200) {
          if (fetchingData) {
            const responseData = await response.json();
            setComments(responseData.comments);
            createParagraphs(responseData.post);
            setFullPost(responseData.post);
          }
        }
      } catch (err) {
        console.log(err);
      }
    };
    if (fetchingData) {
      setFetchingData(false);
      fetchData();
    }
  }, [fetchingData]);

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
        `https://blogapi-production-7add.up.railway.app/posts/${postID}/newcomment`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: commentbody,
        }
      );
      if (response.status === 201) {
        setFetchingData(true);
        setShowCommentBox(false);
        navigate(`/blog/posts/${postID}`);
      }
    } catch (err) {
      console.log(err);
    }
  };

  if (fetchingData || fullPost === undefined) {
    return <RotatingOrange />;
  } else {
    return (
      <div className="d-flex flex-column flex-grow-1 mb-5">
        <div className="flex-grow-1">
          <h2>{fullPost.title}</h2>
          <p className="text-muted">
            <i className="las la-calendar"></i>
            <span> </span>Published {fullPost.post_timestamp} by{" "}
            {fullPost.author.author_name}
          </p>
          <div className="my-4">
            {post.map((para) => (
              <p key={uuidv4()}>{para}</p>
            ))}
          </div>
        </div>
        <div>
          <button onClick={showbox} className="btn btn-primary  text-white">
            Add comment
          </button>
        </div>

        {showCommentBox ? (
          <form onSubmit={handlerOfSubmit} className="w-50 mt-4">
            <label htmlFor="readerusername" className="form-label">
              Username:
            </label>
            <input
              id="readerusername"
              name="readerusername"
              type="text"
              onChange={handlerOfChange}
              required
              maxLength="50"
              className="form-control"
            />
            <label htmlFor="readeremail" className="form-label">
              E-mail (optional):
            </label>
            <input
              id="readeremail"
              name="readeremail"
              type="email"
              maxLength="50"
              onChange={handlerOfChange}
              className="form-control"
            />
            <label htmlFor="commentcontent" className="form-label">
              Comment:
            </label>
            <textarea
              id="commentcontent"
              name="commentcontent"
              maxLength="300"
              required
              onChange={handlerOfChange}
              className="form-control"
            />
            <button
              type="submit"
              className="btn btn-primary w-25 mt-2 text-white"
            >
              Save
            </button>
          </form>
        ) : null}
        <h3 className="mt-4 mb-4">Comments</h3>
        {comments.length === 0 ? <p>No comments yet.</p> : null}
        <ul className="list-group-flush">
          {comments.map((comment) => (
            <div key={uuidv4()}>
              <Comment commentinfo={comment} />
            </div>
          ))}
        </ul>
      </div>
    );
  }
};

export default SinglePost;
