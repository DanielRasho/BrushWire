import { useState, useEffect } from "react";
import Footer from "../components/atoms/Footer";
import ErrorLoading from "../components/atoms/ErrorLoading";
import Loader from "../components/atoms/Loader";
import PostCard from "../components/molecules/PostCard";
import TopBar from "../components/molecules/TopBar";
import { Navigate } from "react-router-dom";
import formatDate from "../helpers/dateFormat";

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [postsInfo, setPostsInfo] = useState([]);

  const navLinks = [
    {
      content: "Trending",
      onClick: () => Navigate("/"),
    },
    {
      content: "About Us",
      onClick: () => Navigate("/"),
    },
  ];

  useEffect(() => {
    console.log("HELLO");
    setIsLoading(true);
    fetch("http://localhost:3000/", {
      method: "get",
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => response.json())
      .then((data) => {
        setPostsInfo(data.posts);
        setIsLoading(false);
      })
      .catch(() => setIsError(true))
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <>
      <TopBar navLinks={navLinks} />

      <div className="home-header font-display">
        <h1>Blog spotlight</h1>
        <div className="gradient-container">
          <img src="./gradient-noise-green-red.png" alt="" />
        </div>
      </div>

      <div className="loader-container">
        <Loader isLoading={isLoading}></Loader>
      </div>

      <div>
        <ErrorLoading
          isError={isError}
          message="Something wrong happen. Unable to retrieve posts"
        ></ErrorLoading>
      </div>

      <div className="post-container">
        {postsInfo.map((post) => {
          return (
            <PostCard
              key={post.id}
              postId={post.id}
              date={formatDate(post.publishdate)}
              title={post.title}
              tags={post.tags}
              thumbnail={post.thumbnailpath}
            ></PostCard>
          );
        })}
      </div>
      <Footer></Footer>
    </>
  );
}
