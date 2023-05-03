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
          "http://localhost.localdomain:5000/editor/newpost",
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
        "http://localhost.localdomain:5000/editor/newpost",
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
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            maxLength="100"
            required
            name="title"
            id="title"
            onChange={handlerOfChange}
          />
          <label htmlFor="postcontent">Post:</label>
          <textarea
            type="textarea"
            name="postcontent"
            id="postcontent"
            required
            onChange={handlerOfChange}
          />
          <label htmlFor="draft">Save as draft or publish:</label>
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
              />
              <label htmlFor="poststatus1">Draft</label>
              <input
                type="radio"
                id="poststatus2"
                name="poststatus"
                value="publish"
                onChange={handlerOfChange}
              />
              <label htmlFor="poststatus2">Publish</label>
            </div>
          </fieldset>
          <button type="submit">Save</button>
        </form>
      </div>
    );
  } else {
    return <div>It's broken</div>;
  }
};

export default NewPost;
