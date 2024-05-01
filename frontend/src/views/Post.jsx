import { useState, useRef, useEffect } from "react";
import PropTypes from "prop-types";
import TopBar from "../components/molecules/TopBar";
import { useParams } from "react-router-dom";
import EditorJS from "@editorjs/editorjs";
import Header from "@editorjs/header";
import List from "@editorjs/list";
import Quote from "@editorjs/quote";
import SimpleImage from "@editorjs/simple-image";
import Underline from "@editorjs/underline";

export default function Post() {
  const { id } = useParams();

  const [title, setTitle] = useState("");
  const [thumbnailURL, setThumbnailURL] = useState("");
  const [tags, setTags] = useState([]);

  const editorRef = useRef(null);

  const titleRef = useRef();

  const auto_height = () => {
    titleRef.current.style.height = "auto";
    titleRef.current.style.height = titleRef.current.scrollHeight + "px";
  };

  const handleFetchPost = async (id, editorInstance) => {
    try {
      const response = await fetch(`http://localhost:3000/post/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const status = await response.status;
      const data = await response.json();

      if (status !== 200) {
        throw data.message;
      }

      const post = data.post;

      setTitle(post.title);
      setTags(post.tags);
      setThumbnailURL(post.thumbnail);
      editorInstance.isReady.then(() =>
        editorInstance.render(JSON.parse(post.content)),
      );
    } catch (error) {
      alert(error);
    }
  };

  useEffect(() => {
    // EDITOR JS Instance
    const editorInstance = new EditorJS({
      holder: "editorjs",
      data: {},
      readOnly: true,
      placeholder: 'Write something, type "/" for input a command',
      minHeight: 30,
      tools: {
        header: Header,
        list: List,
        image: SimpleImage,
        underline: Underline,
        quote: {
          class: Quote,
          config: {
            quotePlaceholder: "Enter a quote",
            captionPlaceholder: "Quote's author",
          },
        },
      },
    });

    console.log("Executing initialization");

    editorRef.current = editorInstance;

    handleFetchPost(id || undefined, editorInstance);

    // ADD EVENT WHEN RESIZING
    window.addEventListener("resize", auto_height);

    return () => {
      window.removeEventListener("resize", auto_height);
      editorInstance.isReady.then(() => editorInstance.destroy());
    };
  }, []);

  return (
    <div className="blog-editor">
      <TopBar></TopBar>
      <div className="metadata-editor">
        <textarea
          ref={titleRef}
          value={title}
          onInput={auto_height}
          className="title"
          type="textarea"
          placeholder="Title here..."
          maxLength={45}
          readOnly={true}
          style={{ cursor: "default" }}
        />
        <div className="tag-container">
          <div className="tags-list">
            {tags.map((tag) => {
              return (
                <span key={tag} className="tag">
                  {tag}
                </span>
              );
            })}
          </div>
        </div>
        <div className="thumbnail-upload-wrapper">
          <img src={thumbnailURL} alt="" />
        </div>
      </div>
      <div id="editorjs"></div>
    </div>
  );
}

function HTMLRenderer({ htmlStrings }) {
  return (
    <div className="postContent">
      {htmlStrings.map((html, index) => (
        <div key={index} dangerouslySetInnerHTML={{ __html: html }} />
      ))}
    </div>
  );
}

HTMLRenderer.propTypes = {
  htmlStrings: PropTypes.arrayOf(PropTypes.string),
};

Post.propTypes = {
  id: PropTypes.any,
  initTitle: PropTypes.string,
  initTags: PropTypes.arrayOf(PropTypes.string),
  initThumbnail: PropTypes.string,
  initContent: PropTypes.object,
};
