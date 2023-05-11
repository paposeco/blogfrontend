import React, { useState, useEffect } from "react";

const Footer = function() {
  const [year, setYear] = useState("");

  useEffect(() => {
    if (year === "") {
      const date = new Date();
      const currYear = date.getFullYear();
      setYear(currYear);
    }
  }, [year]);
  return (
    <div className="min-v-100 mb-2">
      <p className="text-center">
        {" "}
        <i className="las la-copyright"></i>
        <span> </span> {year} |{" "}
        <a href="https://github.com/paposeco">
          <i className="lab la-github"></i> Fabi
        </a>
      </p>
    </div>
  );
};

export default Footer;
