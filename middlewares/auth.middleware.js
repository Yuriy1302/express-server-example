const jwt = require("jsonwebtoken");

require("dotenv").config();

module.exports = (req, res, next) => {
  if (req.method === 'OPTION') {
    return next();
  }

  try {
    const token = req.headers.authorization.split(" ")[1];

    if (!token) {
      res.status(403).json({ status: 'FAILURE', message: "Пользователь не авторизован" });
    }

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

    req.userId = decodedToken.userId;

    next();
  } catch (err) {
    res.status(403).json({ status: 'FAILURE', message: "Пользователь не авторизован" });
  }
};
