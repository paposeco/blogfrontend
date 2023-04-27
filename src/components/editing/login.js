import React, { useEffect, useState } from "react";

const Login = function() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  // useEffect(() => {
  //   async function fetchData() {
  //     try {
  //       const response = await fetch("http://localhost.localdomain:5000/posts");
  //       const responseContent = await response.json();
  //       console.log(responseContent);
  //       setToken(responseContent);
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   }
  //   fetchData();
  // }, []);
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