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
    <div>
      <p> icon {year} | Fabi</p>
    </div>
  );
};

export default Footer;
