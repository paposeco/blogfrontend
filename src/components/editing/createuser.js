import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const CreateUser = function(props) {
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [confirmpassword, setconfirmpassword] = useState("");
  const [match, setmatch] = useState(true);

  const [createUserAvailable, setCreateUserAvailable] = useState(false);
  const navigate = useNavigate();

  const handlerOfChange = function(event) {
    switch (event.target.name) {
      case "name":
        setname(event.target.value);
        break;
      case "email":
        setemail(event.target.value);
        break;
      case "password":
        setpassword(event.target.value);
        break;
      case "confirmpassword":
        setconfirmpassword(event.target.value);
        if (event.target.value !== password) {
          setmatch(false);
        } else {
          setmatch(true);
        }
        break;
      default:
        break;
    }
  };

  const userAvailable = async function() {
    try {
      const response = await fetch(
        "https://blogapi-production-7add.up.railway.app/editor/createuser",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status === 200) {
        setCreateUserAvailable(true);
      } else {
        setCreateUserAvailable(false);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handlerOfSubmit = async function(event) {
    event.preventDefault();
    try {
      const response = await fetch(
        "https://blogapi-production-7add.up.railway.app/editor/createuser",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email,
            password: password,
            name: name,
          }),
        }
      );
      if (response.status === 200) {
        const responseData = await response.json();
        localStorage.setItem("token", responseData.token);
        localStorage.setItem("author", responseData.author);
        props.loggedin();
        navigate("/editor/posts");
      } else {
        console.log(response.status);
        console.log("something went wrong");
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    userAvailable();
  }, []);

  if (createUserAvailable) {
    return (
      <div>
        <form
          onSubmit={handlerOfSubmit}
          className="d-flex flex-column gap-1 loginform"
        >
          <label htmlFor="name" className="form-label">
            Your name:
          </label>
          <input
            type="text"
            name="name"
            id="name"
            onChange={handlerOfChange}
            maxLength="50"
            className="form-control"
          />
          <label htmlFor="email" className="form-label">
            E-mail:
          </label>
          <input
            type="email"
            name="email"
            id="email"
            onChange={handlerOfChange}
            className="form-control"
            maxLength="50"
          />
          <label htmlFor="password" className="form-label">
            Password:
          </label>
          <input
            type="password"
            name="password"
            id="password"
            onChange={handlerOfChange}
            className="form-control"
          />
          <label htmlFor="confirmpassword" className="form-label">
            Confirm password:
          </label>
          <input
            type="password"
            name="confirmpassword"
            id="confirmpassword"
            onChange={handlerOfChange}
            className="form-control"
          />
          <p>{match ? null : "Passwords don't match."}</p>
          <button
            type="submit"
            className="btn btn-primary text-white loginformbtn"
            disabled={match ? false : true}
          >
            Log in
          </button>
        </form>
      </div>
    );
  } else {
    return <p>User creation is not available right now.</p>;
  }
};

export default CreateUser;
