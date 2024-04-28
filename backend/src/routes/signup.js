const express = require("express");
const Logger = require("../Logger");
const { createToken, authenticateToken } = require("../authentication");
const { DB_POOL, existOnlyOne } = require("../db");
const User = require("../models/user");

const signUpRouter = express.Router();

signUpRouter.post("/", async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(401).json({ message: "Username or password not send" });
  }

  const userExist = await existOnlyOne(
    DB_POOL,
    "SELECT * FROM member WHERE username = $1::text",
    [username],
  );

  if (userExist) {
    res.status(401).json({ message: "That username is already taken" });
  } else {
    await DB_POOL.query(
      "INSERT INTO member (username, password) VALUES ( $1::text, $2::text)",
      [username, password],
    );
    res.status(200).json({
      token: createToken(username, process.env.JWT_SECRET),
      message: "Sign up successful, logging enabled.",
    });
  }
});

module.exports = signUpRouter;
