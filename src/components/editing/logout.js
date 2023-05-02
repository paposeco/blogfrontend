import React from "react";
import { useNavigate } from "react-router-dom";

const Logout = function(props) {
  const navigate = useNavigate();
  const handleLogout = function(event) {
    event.preventDefault();
    localStorage.removeItem("token");
    localStorage.removeItem("author");
    props.loggedout();
    navigate("/");
  };

  return (
    <div>
      <p>Are you sure you want to logout?</p>
      <button onClick={handleLogout}>Yes</button>
    </div>
  );
};

export default Logout;
