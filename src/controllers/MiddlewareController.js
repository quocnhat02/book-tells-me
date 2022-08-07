import Jwt from "jsonwebtoken";

const middlewareController = {
  // verifyToken
  verifyToken: (req, res, next) => {
    const token = req.headers.token;
    if (token) {
      const accessToken = token.split(" ")[1];
      Jwt.verify(accessToken, process.env.JWT_ACCESS_KEY, (err, user) => {
        if (err) {
          res.status(403).json("token is not valid");
        }
        req.user = user;
        next();
      });
    } else {
      res.status(401).json("you're not authentication");
    }
  },

  verifyTokenAndAdminAuth: (req, res, next) => {
    middlewareController.verifyToken(req, res, () => {
      if (req.user.id == req.user.admin) {
        next();
      } else {
        res.status(401).json("You are not allow");
      }
    });
  },
};

module.exports = middlewareController;
