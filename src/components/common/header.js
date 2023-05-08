import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Header = function(props) {
  const navigate = useNavigate();
  const logout = function(event) {
    event.preventDefault();
    navigate("/editor/logout");
  };

  if (!props.logged) {
    return (
      <nav className="navbar navbar-expand-lg">
        <ul className="row list-unstyled">
          <li className="col">
            <Link to="/">Blog</Link>
          </li>
          <li className="col">
            <Link to="/editor/login">Login</Link>
          </li>
        </ul>
      </nav>
    );
  } else {
    return (
      <div className="container">
        <nav className="navbar navbar-expand-lg">
          <div className="container-fluid">
            <div className="navbar-item">
              <Link to="/" className="nav-link">
                Blog
              </Link>
            </div>
            <div className="container">
              <div className="navbar-nav">
                <p className="navbar-item">
                  <Link to="/editor/posts" className="nav-link">
                    Editor
                  </Link>
                </p>
                <p className="navbar-item">Hi {props.author}</p>
                <button className="navbar-item" onClick={logout}>
                  Logout
                </button>
              </div>
            </div>
          </div>
        </nav>
      </div>
    );
  }

  // if (!props.logged) {
  //   return (
  //     <nav className="container">
  //       <ul className="row list-unstyled">
  //         <li className="col">
  //           <Link to="/">Blog</Link>
  //         </li>
  //         <li className="col">
  //           <Link to="/editor/login">Login</Link>
  //         </li>
  //       </ul>
  //     </nav>
  //   );
  // } else {
  //   return (
  //     <nav className="container row justify-content-between">
  //       <div className="col flex-grow-1">
  //         <Link to="/">Blog</Link>
  //       </div>
  //       <div className="col">
  //         <div className="container row">
  //           <p className="col col-lg-2">
  //             <Link to="/editor/posts">Editor</Link>
  //           </p>
  //           <p className="col col-lg-2">Hi {props.author}</p>
  //           <button className="col col-lg-2" onClick={logout}>
  //             Logout
  //           </button>
  //         </div>
  //       </div>
  //     </nav>
  //   );
  // }
};

export default Header;
