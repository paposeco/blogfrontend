import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const PostListItem = function(props) {
  const [draftStatus, setDraftStatus] = useState();
  useEffect(() => {
    setDraftStatus(
      props.postinfo.draft === true
        ? "Draft"
        : `Published ${props.postinfo.post_timestamp}`
    );
  }, [props]);

  return (
    <li key={props.postinfo._id}>
      <Link to={props.postinfo.urleditor}>{props.postinfo.title}</Link>{" "}
      {draftStatus}
    </li>
  );
};

export default PostListItem;
