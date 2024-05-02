const express = require('express')
const Logger = require('../Logger')
const { createToken, authenticateToken } = require('../authentication')
const { DB_POOL } = require('../db')
const User = require('../models/user')

const loginRouter = express.Router()

loginRouter.post('/', async (req, res) => {
  const { username, password } = req.body

  if (!username || !password) {
    return res.status(401).json({ message: 'Username or password not send' })
  }

  const DBData = await DB_POOL.query(
    'SELECT password FROM member WHERE username = $1::text',
    [username]
  )
  const DBpassword = DBData.rows[0]

  if (!DBpassword) {
    res.status(401).json({ message: 'User does not exist' })
  } else if (DBpassword.password !== password) {
    res.status(401).json({ message: 'Invalid username or password ' })
  } else {
    res.status(200).json({
      token: createToken(username, process.env.JWT_SECRET),
      message: 'Login successfull'
    })
  }
})

module.exports = loginRouter
