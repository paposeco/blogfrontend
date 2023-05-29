import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

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
    <li className="list-group-item py-1" key={uuidv4()}>
      <i className="las la-file-alt"></i>
      <span> </span>
      <Link to={props.postinfo.urleditor}>{props.postinfo.title}</Link>{" "}
      <span className="text-muted">{draftStatus}</span>
    </li>
  );
};

export default PostListItem;
