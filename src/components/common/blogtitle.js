import React from "react";
import smallorange from "../../images/meialaranjasmall.png";

const BlogTitle = function() {
  return (
    <div className="my-4 text-center">
      <img
        src={smallorange}
        alt="halfanorange"
        style={{ transform: "rotate(0.75turn)" }}
      />
      <h1>More Oranges</h1>
    </div>
  );
};

export default BlogTitle;
