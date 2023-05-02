import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const Header = function(props) {
  const navigate = useNavigate();
  const logout = function(event) {
    event.preventDefault();
    navigate("/editor/logout");
  };

  if (!props.logged) {
    return (
      <div>
        <ul>
          <li>
            <Link to="/">Blog</Link>
          </li>
          <li>
            <Link to="/editor/login">Login</Link>
          </li>
        </ul>
      </div>
    );
  } else {
    return (
      <div>
        <ul>
          <li>
            <Link to="/">Blog</Link>
          </li>
          <li>
            <Link to="/editor/posts">Editor</Link>
          </li>
          <li>Hi {props.author}</li>
        </ul>
        <button onClick={logout}>Logout</button>
      </div>
    );
  }
};

export default Header;
