import React from "react";
import smallorange from "../../images/meialaranjasmall.png";
import { Link } from "react-router-dom";

const BlogTitle = function() {
  return (
    <div className="my-4 text-center">
      <Link to="/">
        <img
          src={smallorange}
          alt="halfanorange"
          style={{ transform: "rotate(0.75turn)" }}
        />
      </Link>

      <h1>
        <Link className="text-reset text-decoration-none" to="/">
          More Oranges
        </Link>
      </h1>
    </div>
  );
};

export default BlogTitle;
