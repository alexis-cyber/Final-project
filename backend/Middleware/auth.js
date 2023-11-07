const jwt = require("jsonwebtoken");
require("dotenv").config();

const verifyToken = (req, res, next) => {
  try {
    let receivedToken = req.headers.authorization.split(" ")[1];
    if (!receivedToken) {
      return res.status(403).send({ msg: "Token does not exist." });
    } else {
      let verifiedToken = jwt.verify(receivedToken, process.env.TOKEN_KEY);
      if (!verifiedToken) {
        return res.status(401).send({ msg: "Not authorized." });
      } else {
        req.user = verifiedToken;
        next();
      }
    }
  } catch (err) {
    res.status(500).send({ msg: "Internal server error." });
  }
};

module.exports = verifyToken;