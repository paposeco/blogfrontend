import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = function(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const handlerOfChange = function(event) {
    if (event.target.id === "email") {
      setUsername(event.target.value);
    } else if (event.target.id === "password") {
      setPassword(event.target.value);
    }
  };
  const handlerOfSubmit = async function(event) {
    event.preventDefault();
    try {
      const response = await fetch(
        "http://localhost.localdomain:5000/editor/login",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username: username, password: password }),
        }
      );
      const responseData = await response.json();
      localStorage.setItem("token", responseData.token);
      localStorage.setItem("author", responseData.author);
      props.loggedin();
      navigate("/editor/posts");
    } catch (err) { }
  };
  return (
    <div>
      <form onSubmit={handlerOfSubmit}>
        <label htmlFor="email">
          E-mail:
          <input
            type="email"
            name="email"
            id="email"
            onChange={handlerOfChange}
          />
        </label>
        <label htmlFor="password">
          Password:
          <input
            type="password"
            name="password"
            id="password"
            onChange={handlerOfChange}
          />
        </label>
        <button type="submit">Log in</button>
      </form>
    </div>
  );
};

export default Login;
