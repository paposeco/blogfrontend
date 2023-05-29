import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Post from "./post";
import Pagination from "./pagination";
import { v4 as uuidv4 } from "uuid";
import RotatingOrange from "../common/orange";

const Blog = function() {
  const [posts, setPosts] = useState([]);
  const [dataFetched, setDataFetched] = useState(false);
  const [totalpostsfetched, settotalpostsfetched] = useState(false);
  const [paginationCompontents, setPaginationComponents] = useState([]);

  const location = useLocation();
  const [currentPage, setCurrentPage] = useState("");

  useEffect(() => {
    setDataFetched(false);
    const pagenumber = location.pathname[location.pathname.length - 1];
    if (pagenumber === "/") {
      setCurrentPage("http://localhost.localdomain:5000/");
    } else {
      setCurrentPage("http://localhost.localdomain:5000/blog/" + pagenumber);
    }
  }, [location]);

  useEffect(() => {
    const fetchData = async function() {
      try {
        const response = await fetch(currentPage, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (response.status === 200) {
          const responseData = await response.json();
          setPosts(responseData.posts);
        }
      } catch (err) {
        console.log(err);
      }
    };

    if (!dataFetched && currentPage !== "") {
      setDataFetched(true);
      fetchData();
    }
  }, [currentPage]);

  const createPaginationComponentList = function(totalposts) {
    const pages = Math.floor(totalposts / 6);
    const currpage = location.pathname[location.pathname.length - 1];
    let componentsarray = [];
    for (let i = 0; i < pages + 1; i++) {
      let actClass = "";
      if (Number(currpage) === i + 1 || (currpage === "/" && i === 0)) {
        actClass = "active";
      }
      componentsarray.push(
        <li className="page-item" key={uuidv4()}>
          <Pagination pagenumber={i + 1} activeclass={actClass} />
        </li>
      );
    }
    setPaginationComponents(componentsarray);
  };

  useEffect(() => {
    const fetchData = async function() {
      try {
        const response = await fetch(
          "http://localhost.localdomain:5000/totalposts",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (response.status === 200) {
          const responseData = await response.json();
          createPaginationComponentList(responseData.totalposts);
        }
      } catch (err) {
        console.log(err);
      }
    };
    if (!totalpostsfetched) {
      settotalpostsfetched(true);
      fetchData();
    }
  }, [totalpostsfetched]);

  if (!dataFetched) {
    return <RotatingOrange />;
  } else {
    return (
      <div className="d-flex flex-column flex-grow-1">
        <div className="d-flex flex-column flex-grow-1">
          {posts.map((post) => (
            <div key={uuidv4()}>
              <Post post={post} />
            </div>
          ))}
        </div>
        <ul className="pagination d-flex flex-row justify-content-center gap-2">
          {paginationCompontents}
        </ul>
      </div>
    );
  }
};

export default Blog;
