import React, { useEffect, useState } from "react";

const NewPost = function() {
  const [token, setToken] = useState(localStorage.getItem("token"));
  useEffect(() => {
    const fetchData = async function() {
      if (token !== undefined && token !== null) {
        try {
          const response = await fetch(
            "http://localhost.localdomain:5000/editor/newpost",
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
            }
          );
          const responseData = await response.json();
          console.log(responseData);
        } catch (err) {
          console.log(err);
        }
      }
    };
    fetchData();
  }, []);
  return <div>new post</div>;
};

export default NewPost;
