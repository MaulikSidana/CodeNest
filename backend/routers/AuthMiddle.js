const jwt = require('jsonwebtoken');
const JWT_SECRET = "MERA_LEETCODE";

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).send('Token missing');
  }

  const token = authHeader.split(' ')[1]; // Bearer TOKEN

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded; 
    next();

  } catch (err) {
    return res.status(401).send('Invalid token');
  }
};

const AdminOnly = (req, res, next) => {
  if (req.user.role !== 'admin') {
    return res.status(403).send('Access denied : Admins only');
  }
  next();
};
const UserOnly = (req, res, next) => {
  if (req.user.role !== 'user') {
    return res.status(404).send('Access denied : Users only');
  }
  next();
};

module.exports = {authMiddleware,AdminOnly,UserOnly};
