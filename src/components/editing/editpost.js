import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const EditPost = function() {
  const { state } = useLocation();
  const location = useLocation();
  const navigate = useNavigate();
  const [postID, setPostID] = useState("");
  const [postTitle, setPostTitle] = useState(state.title);
  const [postContent, setPostContent] = useState(state.content);
  const [postStatus, setPostStatus] = useState(state.draft);
  const [token, setToken] = useState(localStorage.getItem("token"));

  useEffect(() => {
    const IDandMore = location.pathname.substring(14);
    const findDash = IDandMore.indexOf("/");
    setPostID(IDandMore.substring(0, findDash));
  }, [location]);

  // if the post is edited, the date gets updated
  const handlerOfSubmit = async function(event) {
    event.preventDefault();
    try {
      const response = await fetch(
        `http://localhost.localdomain:5000/editor/posts/${postID}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            token: token,
            title: postTitle,
            content: postContent,
            draft: postStatus,
          }),
        }
      );
      if (response.status === 201) {
        navigate("/editor/posts/");
      }
    } catch (err) {
      console.log(err);
    }
  };
  const handlerOfChange = function(event) {
    if (event.target.name === "title") {
      setPostTitle(event.target.value);
    } else if (event.target.name === "postcontent") {
      setPostContent(event.target.value);
    } else if (event.target.name === "poststatus") {
      if (event.target.id === "poststatus1") {
        setPostStatus(true);
      } else {
        setPostStatus(false);
      }
    }
  };
  return (
    <div>
      <h2>New Post</h2>
      <form onSubmit={handlerOfSubmit}>
        <label htmlFor="title" className="form-label">
          Title:
        </label>
        <input
          type="text"
          maxLength="100"
          required
          name="title"
          id="title"
          value={postTitle}
          onChange={handlerOfChange}
          className="form-control mb-1"
        />
        <label htmlFor="postcontent" className="form-label">
          Post:
        </label>
        <textarea
          type="textarea"
          name="postcontent"
          id="postcontent"
          value={postContent}
          required
          onChange={handlerOfChange}
          className="form-control mb-2"
          rows="35"
        />
        <fieldset>
          <legend>Save as draft or publish</legend>
          <div>
            <input
              type="radio"
              id="poststatus1"
              name="poststatus"
              value="draft"
              checked={postStatus ? true : false}
              onChange={handlerOfChange}
              className="mx-2"
            />
            <label htmlFor="poststatus1" className="form-label">
              Draft
            </label>
            <input
              type="radio"
              id="poststatus2"
              name="poststatus"
              value="publish"
              checked={postStatus ? false : true}
              onChange={handlerOfChange}
              className="mx-2"
            />
            <label htmlFor="poststatus2">Publish</label>
          </div>
        </fieldset>
        <button type="submit" className="btn btn-primary text-white">
          Save
        </button>
      </form>
    </div>
  );
};

export default EditPost;
