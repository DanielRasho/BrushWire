const express = require("express");
const Logger = require("../Logger");
const { createToken, authenticateToken } = require("../authentication");
const { pool, existOnlyOne } = require("../db");
const User = require("../models/user");
const PostDetails = require("../models/postDetails");
const fileManager = require("../fileManager");
const Post = require("../models/post");

const userRouter = express.Router();

userRouter.get("/", authenticateToken, async (req, res) => {
  const DBData = await pool.query(
    `SELECT username, password 
    FROM member WHERE username = $1::text`,
    [req.user],
  );
  const { username, password } = DBData.rows[0];
  res.status(200).json({ username, password });
});

userRouter.get("/posts", authenticateToken, async (req, res) => {
  const DBData = await pool.query(
    `SELECT 
      id,
      author,
      title,
      tags, 
      publish_date, 
      thumbnail_path
      FROM post WHERE author = $1::text 
      ORDER BY publish_date desc`,
    [req.user],
  );

  // Fetching all posts from user
  const posts = DBData.rows.map((row) => {
    const { id, author, title, tags, publishDate, thumbnailPath } = row;
    return new PostDetails(
      id,
      title,
      author,
      tags.split(","),
      publishDate,
      fileManager.searchImage(thumbnailPath),
    );
  });

  res.status(200).json({ posts });
});

userRouter.get("/posts/:id", async (req, res) => {
  const postId = req.params.id;

  if (!postId) {
    return res.status(400).json({ message: "Post id not sended." });
  }

  const response = await pool.query(
    `
  SELECT 
  id,
  author,
  title,
  tags,
  publish_date,
  thumbnail_path,
  content_path
  FROM post WHERE id = $1`,
    [postId],
  );

  if (response.rows === 0) {
    return res
      .status(400)
      .json({ message: `Post with id ${postId} does not exist` });
  }
  const { id, author, title, tags, publishDate, thumbnailPath, contentPath } =
    response.rows[0];
  const post = new Post(
    id,
    author,
    title,
    tags.split(","),
    publishDate,
    fileManager.searchImage(thumbnailPath),
    fileManager.searchDocument(contentPath),
  );
  return res.status(200).json({ message: "Post found", post });
});

userRouter.post("/posts", authenticateToken, async (req, res) => {
  const { title, tags, thumbnail, content } = req.body;

  if (!title || !tags || !thumbnail || !content) {
    return res
      .status(400)
      .json({ message: "Some fields are empty, cant create post." });
  }

  const postExist = await existOnlyOne(
    pool,
    `SELECT * FROM post WHERE author = $1::text AND title = $2::text`,
    [req.user, title],
  );

  if (postExist) {
    res.status(400).json({ message: "Post already exist" });
  } else {
    const thumbnailPath = fileManager.saveImage(req.user, title, thumbnail);
    const contentPath = fileManager.saveDocument(req.user, title, content);
    await pool.query(
      ` 
    INSERT INTO post (author, title, tags, thumbnail_path, content_path)
    VALUES ($1::text, $2::text, $3::text, $4::text, $5::text)`,
      [req.user, title, tags.join(","), thumbnailPath, contentPath],
    );
    res.status(200).json({ message: "Post created" });
  }
});

userRouter.put("/posts", authenticateToken, async (req, res) => {
  const post = req.body;
  if (!post.id || !post.tags || !post.thumbnail || !post.content) {
    return res
      .status(400)
      .json({ message: "Some fields are empty. Cant update post" });
  }

  const DBauthor = await (
    await pool.query(`SELECT author FROM post WHERE id = $1`, [post.id])
  ).rows[0].author;

  if (req.user !== DBauthor) {
    return res
      .status(400)
      .json({ message: "You cannot edit post that are not yours." });
  }

  await pool.query(
    ` 
    UPDATE post SET 
    tags = $1::text,
    thumbnail_path = $2::text,
    content_path = $3::text
    WHERE id = $4`,
    [
      post.tags.join(","),
      fileManager.saveImage(req.user, post.title, post.thumbnail),
      fileManager.saveDocument(req.user, post.title, post.content),
      post.id,
    ],
  );
  return res.status(200).json({ message: "Post updated" });
});

userRouter.delete("/posts/:id", authenticateToken, async (req, res) => {
  const postId = req.params.id;

  if (!postId) {
    return res.status(400).json({ message: "Post id not sended." });
  }

  const DBPost = (
    await pool.query(`SELECT author FROM post WHERE id=$1`, [postId])
  ).rows[0];

  if (!DBPost) {
    return res
      .status(400)
      .json({ message: "Post with given id does not exist." });
  }
  if (req.user !== DBPost.author) {
    return res
      .status(400)
      .json({ message: "User most be author of the edited post" });
  }
  await pool.query(`DELETE FROM post WHERE id = $1`, [postId]);
  return res.status(200).json({ message: "Post deleted" });
});

module.exports = userRouter;
