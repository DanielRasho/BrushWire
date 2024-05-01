import { useState, useRef, useEffect, useContext } from "react";
import EditorJS from "@editorjs/editorjs";
import Header from "@editorjs/header";
import List from "@editorjs/list";
import Quote from "@editorjs/quote";
import SimpleImage from "@editorjs/simple-image";
import Underline from "@editorjs/underline";
import PropTypes from "prop-types";
import TopBar from "../components/molecules/TopBar";
import { useLocation, useNavigate } from "react-router-dom";
import { AUTH_CONTEXT } from "../providers/auth";
import isObjectEmpty from "../helpers/emptyObject";

export default function BlogEditor() {
  const navigate = useNavigate();
  const location = useLocation();

  const { token } = useContext(AUTH_CONTEXT);

  const [id, setId] = useState(undefined);
  const [title, setTitle] = useState("");
  const [thumbnailURL, setThumbnailURL] = useState("");
  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState("");
  const [thumbnail, setThumbnail] = useState({});

  const [editMode] = useState(location.state.mode === "edit" ? true : false);

  const MAX_TAGS = 3;

  const titleRef = useRef();
  const editorRef = useRef(null);

  const auto_height = () => {
    titleRef.current.style.height = "auto";
    titleRef.current.style.height = titleRef.current.scrollHeight + "px";
  };

  const handleTitleInput = (event) => {
    if (editMode == false) setTitle(event.target.value);
  };

  const handleTagInput = (event) => {
    setTagInput(event.target.value);
  };

  const handleCreateTag = (event) => {
    if (
      event.key == "Enter" &&
      !tags.includes(tagInput) &&
      tags.length < MAX_TAGS
    ) {
      setTags([...tags, tagInput]);
      setTagInput("");
    }
  };

  const handleDeleteTag = (id) => {
    console.log(id);
    setTags(tags.filter((tag) => tag !== id));
  };

  const handleChangeImage = (e) => {
    if (e.target.files) {
      const thumbnailImage = e.target.files[0];
      setThumbnail(thumbnailImage);
      setThumbnailURL(URL.createObjectURL(thumbnailImage));
    }
  };

  const handleDeleteDraft = () => {
    let confirmation = window.confirm(
      "Do you really want to delete your draft?",
    );
    if (confirmation) navigate("/user");
  };

  const publish = (image64, content) => {
    try {
      fetch("http://localhost:3000/user/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify({
          title: title,
          tags: tags,
          thumbnail: image64,
          content: JSON.stringify(content),
        }),
      }).then(() => navigate("/user"));
    } catch (error) {
      console.log("Something went wrong.");
    }
  };

  const edit = (image64, content) => {
    try {
      fetch("http://localhost:3000/user/posts", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify({
          id: id,
          title: title,
          tags: tags,
          thumbnail: image64,
          content: JSON.stringify(content),
        }),
      })
        .then((response) => response.json())
        .then((data) => console.log(data));
    } catch (error) {
      console.log("something went wrong");
    }
  };

  const handleSendPost = async () => {
    let content = await editorRef.current.save();
    let thumbnailBase64;

    console.log(isObjectEmpty(thumbnail));

    // eslint-disable-next-line no-extra-boolean-cast
    if (isObjectEmpty(thumbnail)) {
      // If thumbnail is empty, means, the user did not change the existing image.
      if (editMode) {
        // Double security check
        edit(thumbnailURL, content);
      } else {
        publish(thumbnailURL, content);
      }
    } else {
      try {
        const reader = new FileReader();

        reader.onload = () => {
          thumbnailBase64 = reader.result;
          console.log(thumbnailBase64); // Log the thumbnailBase64 here to ensure it's properly assigned
          // Once thumbnailBase64 is assigned, proceed with further actions
          if (editMode) {
            edit(thumbnailBase64, content);
          } else {
            publish(thumbnailBase64, content);
          }
        };

        reader.onerror = (error) => {
          console.error("Error loading file:", error);
        };

        await reader.readAsDataURL(thumbnail);
      } catch (error) {
        console.error("Error loading file:", error);
      }
    }
    navigate("/user");
  };

  useEffect(() => {
    setId(location.state.id || undefined);
    setTitle(location.state.initTitle || "");
    setThumbnailURL(location.state.initThumbnail || "");
    setTags(location.state.initTags || []);

    // EDITOR JS Instance
    const editorInstance = new EditorJS({
      holder: "editorjs",
      data: location.state.initContent,
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

    // ADD EVENT WHEN RESIZING
    window.addEventListener("resize", auto_height);
    return () => {
      window.removeEventListener("resize", auto_height);
      editorInstance.isReady.then(() => editorInstance.destroy());
    };
  }, []);

  return (
    <div className="blog-editor">
      <TopBar />
      <div className="metadata-editor">
        <textarea
          ref={titleRef}
          value={title}
          onInput={auto_height}
          onChange={handleTitleInput}
          className="title"
          type="textarea"
          placeholder="Title here..."
          maxLength={45}
          readOnly={editMode}
          style={{ cursor: editMode ? "default" : "text" }}
        />
        <div className="tag-container">
          <input
            type="text"
            value={tagInput}
            onChange={handleTagInput}
            onKeyDown={handleCreateTag}
            placeholder="Input a tag..."
          />
          <div className="tags-list">
            {tags.map((tag) => {
              return (
                <span key={tag} className="tag">
                  {tag}
                  <i
                    onClick={() => handleDeleteTag(tag)}
                    className="fa-solid fa-xmark"
                  ></i>
                </span>
              );
            })}
          </div>
        </div>
        <div className="thumbnail-upload-wrapper">
          <img src={thumbnailURL} alt="" />
          <label htmlFor="thumbnail-upload">
            <i className="fa-regular fa-image"></i>
            <span>Upload image</span>
          </label>
          <input
            id="thumbnail-upload"
            onChange={handleChangeImage}
            type="file"
            accept="image/"
            hidden
          />
        </div>
      </div>
      <div id="editorjs"></div>
      <div className="submit-buttons">
        <button onClick={handleDeleteDraft}>
          <span>Delete Draft</span>
          <i className="fa-solid fa-trash-can"></i>
        </button>
        <button onClick={handleSendPost}>
          <span>{editMode ? "Edit" : "Post"}</span>
          <i className="fa-solid fa-paper-plane"></i>
        </button>
      </div>
    </div>
  );
}

BlogEditor.propTypes = {
  id: PropTypes.any,
  initTitle: PropTypes.string,
  initTags: PropTypes.arrayOf(PropTypes.string),
  initThumbnail: PropTypes.string,
  initContent: PropTypes.object,
};
