const { verify } = require("jsonwebtoken");
const validateToken = (req, res, next) => {
  const accessToken = req.header("accessToken");
  if (!accessToken) {
    return res.json({ error: "User not logged in!" });
  } else {
    try {
      const validToken = verify(accessToken, "secret");
      req.user = { username: validToken.username, id: validToken.id };
      if (validToken) {
        return next();
      }
    } catch (err) {
      res.json({ error: err });
    }
  }
};

module.exports = validateToken;
