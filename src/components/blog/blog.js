import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Post from "./post";
import Pagination from "./pagination";

const Blog = function() {
  const [posts, setPosts] = useState([]);
  const [fetchfailed, setfetchfailed] = useState(false);
  const [dataFetched, setDataFetched] = useState(false);
  const [totalpostsfetched, settotalpostsfetched] = useState(false);
  const [totalPosts, setTotalPosts] = useState(0);
  const [pagination, setpagination] = useState(0);
  const [paginationCompontents, setPaginationComponents] = useState([]);

  const location = useLocation();
  const [currentPage, setCurrentPage] = useState("");

  useEffect(() => {
    const pagenumber = location.pathname[location.pathname.length - 1];
    setDataFetched(false);
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
        setfetchfailed(true);
      }
    };
    if (!dataFetched && currentPage !== "") {
      fetchData();
      setDataFetched(true);
    }
  }, [dataFetched, currentPage]);

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
          setTotalPosts(responseData.totalposts);
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

  // 5 posts per page
  useEffect(() => {
    if (totalPosts > 0) {
      const pages = Math.floor(totalPosts / 6);
      setpagination(pages);
      const currpage = location.pathname[location.pathname.length - 1];
      let componentsarray = [];
      for (let i = 0; i < pages + 1; i++) {
        let actClass = "";
        if (Number(currpage) === i + 1 || (currpage === "/" && i === 0)) {
          actClass = "active";
        }
        componentsarray.push(
          <li className="page-item">
            <Pagination pagenumber={i + 1} activeclass={actClass} />
          </li>
        );
      }
      setPaginationComponents(componentsarray);
    }
  }, [totalPosts, pagination, location]);

  if (fetchfailed) {
    return <div>Fetching failed.</div>;
  } else {
    return (
      <div>
        {posts.map((post) => (
          <Post post={post} />
        ))}
        <ul className="pagination d-flex flex-row justify-content-center gap-2">
          {paginationCompontents}
        </ul>
      </div>
    );
  }
};

export default Blog;
