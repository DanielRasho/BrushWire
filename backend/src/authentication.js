const jwt = require('jsonwebtoken')

const { JWT_SECRET } = process.env

function createToken(payload, secretKey = JWT_SECRET) {
  return jwt.sign(payload, secretKey)
}

function authenticateToken(req, res, next) {
  const token = req.headers.authorization

  if (token == null) {
    return res.status(401).json({ message: 'Unauthorized' })
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Forbidden' })
    }

    req.user = user
    next()
  })
}

module.exports = {
  createToken,
  authenticateToken
}
