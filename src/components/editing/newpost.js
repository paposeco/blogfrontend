import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const NewPost = function() {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [fetchStatus, setFetchStatus] = useState(true);

  const [dataFetched, setDataFetched] = useState(false);
  const [postTitle, setPostTitle] = useState("");
  const [postContent, setPostContent] = useState("");
  const [postStatus, setPostStatus] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async function() {
      // i could get the author name here
      try {
        const response = await fetch(
          "https://blogapi-production-7add.up.railway.app/editor/newpost",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.status !== 200) {
          if (response.status === 401) {
            navigate("/editor/login");
          } else {
            setFetchStatus(false);
          }
        }
      } catch (err) {
        console.log(err);
      }
    };
    if (!token) {
      navigate("/editor/login");
    } else {
      if (!dataFetched) {
        fetchData();
        setDataFetched(true);
      }
    }
  }, [token, dataFetched, navigate]);
  const handlerOfSubmit = async function(event) {
    event.preventDefault();

    try {
      const response = await fetch(
        "https://blogapi-production-7add.up.railway.app/editor/newpost",
        {
          method: "POST",
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
        // redirect to editor posts
        navigate("/editor/posts");
      } else {
        setFetchStatus(false);
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
  if (fetchStatus && token) {
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
            onChange={handlerOfChange}
            className="form-control"
          />
          <label htmlFor="postcontent" className="form-label">
            Post:
          </label>
          <textarea
            type="textarea"
            name="postcontent"
            id="postcontent"
            required
            onChange={handlerOfChange}
            className="form-control"
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
                checked
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
                onChange={handlerOfChange}
                className="mx-2"
              />
              <label htmlFor="poststatus2" className="form-label">
                Publish
              </label>
            </div>
          </fieldset>
          <button type="submit" className="btn btn-primary">
            Save
          </button>
        </form>
      </div>
    );
  } else {
    return <div>It's broken</div>;
  }
};

export default NewPost;
