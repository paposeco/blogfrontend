import React, { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

const Header = function(props) {
  const navigate = useNavigate();
  const location = useLocation();
  const [blogactive, setblogactive] = useState("active");
  const [editoractive, seteditoractive] = useState("");
  const logout = function(event) {
    event.preventDefault();
    navigate("/editor/logout");
  };

  useEffect(() => {
    if (location.pathname.includes("blog") || location.pathname === "/") {
      setblogactive("active");
      seteditoractive("");
    } else if (location.pathname.includes("editor")) {
      seteditoractive("active");
      setblogactive("");
    }
  }, [location]);

  if (!props.logged) {
    return (
      <nav className="navbar navbar-expand-sm w-100 rounded bg-light">
        <div className="w-100 container-fluid">
          <ul className="navbar-nav d-flex w-100">
            <li className="nav-item">
              <Link className={`nav-link ${blogactive}`} to="/">
                Blog
              </Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link ${editoractive}`} to="/editor/login">
                Login
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    );
  } else {
    return (
      <nav className="navbar navbar-expand-sm w-100 rounded bg-light">
        <div className="w-100 container-fluid">
          <ul className="navbar-nav d-flex w-100">
            <li className="nav-item">
              <Link className={`nav-link ${blogactive}`} to="/">
                Blog
              </Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link ${editoractive}`} to="/editor/posts">
                Editor
              </Link>
            </li>
            <div className="d-flex flex-grow-1 justify-content-end">
              <p className="navbar-text pe-2 mb-0 me-1">Hi {props.author}</p>
              <button
                className="btn btn-primary text-white fw-bold fs-3 px-1 py-0"
                onClick={logout}
              >
                <i className="las la-sign-out-alt"></i>
              </button>
            </div>
          </ul>
        </div>
      </nav>
    );
  }
};

export default Header;
