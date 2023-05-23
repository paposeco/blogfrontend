import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

const Pagination = function(props) {
  const location = useLocation();
  const [pagelink, setpagelink] = useState("");
  useEffect(() => {
    if (pagelink === "") {
      const lastchar = location.pathname[location.pathname.length - 1];
      if (lastchar === "/") {
        setpagelink(location.pathname + "blog/" + props.pagenumber);
      } else {
        let pathname = location.pathname.substring(
          0,
          location.pathname.length - 1
        );
        setpagelink(pathname + props.pagenumber);
      }
    }
  }, [pagelink, location, props]);

  return (
    <Link className={`page-link ${props.activeclass} fw-bolder`} to={pagelink}>
      {props.pagenumber}
    </Link>
  );
};

export default Pagination;
