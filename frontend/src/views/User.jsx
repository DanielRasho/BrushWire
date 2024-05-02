import { useState, useEffect, useContext } from "react";
import PostUserCard from "../components/molecules/PostUserCard";
import Loader from "../components/atoms/Loader";
import ErrorLoading from "../components/atoms/ErrorLoading";
import formatDate from "../helpers/dateFormat";
import { useNavigate } from "react-router-dom";
import { AUTH_CONTEXT } from "../providers/auth";

export default function User() {
  const navigate = useNavigate();
  const { token, setToken } = useContext(AUTH_CONTEXT);

  const [postsInfo, setPostsInfo] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const handleLoadPost = () => {
    setIsLoading(true);
    console.log(token);
    fetch("http://localhost:3000/user/posts", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setPostsInfo([]);
        setPostsInfo(data.posts);
        setIsLoading(false);
      })
      .catch(() => setIsError(true))
      .finally(() => setIsLoading(false));
  };

  const handleDeletePost = (id) => {
    let confirmation = window.confirm(
      "Do you really want to delete this post?",
    );
    if (confirmation) {
      fetch(`http://localhost:3000/user/posts/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      }).then(() => handleLoadPost());
    }
  };

  const handleEditPost = async (id) => {
    const response = await fetch(`http://localhost:3000/user/posts/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    });
    const data = await response.json();
    const post = data.post;

    navigate("/blogeditor", {
      state: {
        mode: "edit",
        id: post.id,
        initTitle: post.title,
        initTags: post.tags,
        initThumbnail: post.thumbnail,
        initContent: JSON.parse(post.content),
      },
    });
  };

  const handleLogOut = () => {
    let confirmLogout = confirm("Do you really want to logout");
    if (confirmLogout) {
      setToken("");
      navigate("/");
    }
  };

  useEffect(() => {
    if (token !== "") {
      handleLoadPost();
    }
  }, [token]);

  useEffect(() => {
    if (token !== "") {
      handleLoadPost();
    }
  }, []);

  return (
    <div className="user-dashboard">
      <div className="user-sidebar">
        <div
          className="logo-container"
          onClick={() => {
            navigate("/");
          }}
        >
          <img src="./brushWireLogo.png" alt="logo" />
        </div>
        <div className="categories-container">
          <button>Profile</button>
          <button>Your Posts</button>
        </div>
        <button className="logout-btn" onClick={handleLogOut}>
          Logout <i className="fa-solid fa-right-from-bracket"></i>
        </button>
      </div>
      <div className="user-display">
        <div className="profile-category" hidden></div>
        <div className="posts-category">
          <div className="posts-category-header">
            <h2 className="font-display">Posts</h2>
            <button
              className="write-btn font-btn-confirmation"
              onClick={() =>
                navigate("/blogeditor", { state: { mode: "create" } })
              }
            >
              <span>Write</span>
              <i className="fa-solid fa-pen-nib"></i>
            </button>
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
          <div className="posts-container">
            {postsInfo.map((post, index) => {
              return (
                <PostUserCard
                  key={index}
                  date={formatDate(post.publishdate)}
                  title={post.title}
                  tags={post.tags}
                  thumbnail={post.thumbnailpath}
                  onDelete={() => handleDeletePost(post.id)}
                  onEdit={() => handleEditPost(post.id)}
                  onClick={() => navigate(`/post/${post.id}`)}
                ></PostUserCard>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
