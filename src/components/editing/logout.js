import React, { useEffect } from "react";
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

  useEffect(() => {
    document.title = "Log out";
  }, []);

  return (
    <div>
      <p>Are you sure you want to logout?</p>
      <button onClick={handleLogout} className="btn btn-primary text-white">
        Yes
      </button>
    </div>
  );
};

export default Logout;
