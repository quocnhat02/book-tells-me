import Account from "../models/Account";
import Book from "../models/Book";
import { multipleMongooseToObject } from "../util/mongoose";
import bcrypt from "bcrypt";
import "dotenv/config";
import JWT from "jsonwebtoken";
import { render } from "node-sass";

let refreshTokens = [];

const authController = {
  register: async (req, res, next) => {
    try {
      const findUser = await Account.findOne({ email: req.body.email });
      if (findUser) {
        return res.json("Account is ready");
      }
      const salt = await bcrypt.genSalt(10);
      const hashed = await bcrypt.hash(req.body.password, salt);

      // create new user
      const newUser = await new Account({
        email: req.body.email,
        password: hashed,
      });

      // save to DB
      const user = await newUser.save();
      return res.status(200).render("login");
    } catch (error) {
      res.status(500).json(err);
    }
  },

  generateAccessToken: (user) => {
    return JWT.sign(
      {
        id: user.id,
        admin: user.admin,
      },
      process.env.JWT_ACCESS_KEY,
      { expiresIn: "30s" }
    );
  },

  generateRefreshToken: (user) => {
    return JWT.sign(
      {
        id: user.id,
        admin: user.admin,
      },
      process.env.JWT_REFRESH_KEY,
      { expiresIn: "365d" }
    );
  },

  login: async (req, res, next) => {
    try {
      const user = await Account.findOne({ email: req.body.email });
      if (!user) {
        return res.status(404).json("wrong email");
      }
      const validPassword = await bcrypt.compare(
        req.body.password,
        user.password
      );
      if (!validPassword) {
        return res.status(404).json("wrong password");
      }

      if (user && validPassword) {
        const accessToken = authController.generateAccessToken(user);

        const refreshToken = authController.generateRefreshToken(user);

        refreshTokens.push(refreshToken);

        res.cookie("refreshToken", refreshToken, {
          httpOnly: true,
          secure: false,
          path: "/",
          sameSite: "strict",
        });

        const { password, ...others } = user._doc;

        // return res.status(200).json({ ...others, accessToken });
        // return res.redirect("home");
        Book.find({})
          .then((books) => {
            books = multipleMongooseToObject(books);
            return res.render("home", { books });
          })
          .catch((err) => console.log(err));
      }
    } catch (err) {
      return res.status(500).json(err);
    }
  },

  requestRefreshToken: async (req, res, next) => {
    const refreshToken = req.cookies.refreshToken;
    res.status(200).json(refreshToken);
    if (!refreshToken) {
      return res.status(401).json("You are not authenticated");
    }
    if (!refreshToken.includes(refreshToken)) {
      return res.status(403).json("refresh token is not valid");
    }
    JWT.verify(refreshToken, process.env.JWT_REFRESH_KEY, (err, user) => {
      if (err) {
        console.log(err);
      }
      refreshToken = refreshToken.filter((token) => token !== refreshToken);
      // create new accessToken, refreshToken
      const newAccessToken = authController.generateAccessToken(user);
      const newRefreshToken = authController.generateRefreshToken(user);
      refreshToken.push(newRefreshToken);
      res.cookie("refreshToken", newRefreshToken, {
        httpOnly: true,
        secure: false,
        path: "/",
        sameSite: "strict",
      });
      return res.status(200).json({ accessToken: newAccessToken });
    });
  },

  logout: async (req, res) => {
    res.clearCookie("refreshToken");
    refreshTokens = refreshTokens.filter(
      (token) => token !== req.cookies.refreshToken
    );
    return res.status(200).json("logged out !");
  },
};

module.exports = authController;
