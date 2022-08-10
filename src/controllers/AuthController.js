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
    let email = req.body.email;
    let password = req.body.password;
    let repassword = req.body.repassword;
    let kyTuThuong = false;
    let kyTuHoa = false;
    let kyTuSo = false;
    let kyTuDacBiet = false;
    let emailHopLe = false;

    try {
      const findUser = await Account.findOne({ email: email });
      if (findUser) {
        return res.json("Tài khoản này đã tồn tại");
      }

      for(let i = 0; i < password.length; i++){
        if(password[i] >= 'a' && password[i] <= 'z'){
          kyTuThuong = true;
        } else{
           if(password[i] >= 'A' && password[i] <= 'Z'){
             kyTuHoa = true;
            } else{
               if(password[i] >= 0 && password[i] <= 9){
                 kyTuSo = true;
                 }
                 else {
                  kyTuDacBiet = true;
                 }
                }
              }
      }
      
      for(let i = 0; i < password.length; i++){
        if(password[i] == ' '){
          return res.json("Mật khẩu sai định dạng. Mật khẩu có độ dài từ 8-16 ký tự và có tối thiểu 1 ký tự thường 1 ký tự hoa và 1 ký tự số.");
        }
      }

      if(!kyTuThuong || !kyTuHoa || !kyTuSo || kyTuDacBiet){
        return res.json("Mật khẩu sai định dạng. Mật khẩu có độ dài từ 8-16 ký tự và có tối thiểu 1 ký tự thường 1 ký tự hoa và 1 ký tự số.");
      }

      if(password != repassword){
        return res.json("Mật khẩu không khớp");
      }

      if(password.length < 8 || password.length > 16){
        return res.json("Mật khẩu sai định dạng. Mật khẩu có độ dài từ 8-16 ký tự và có tối thiểu 1 ký tự thường 1 ký tự hoa và 1 ký tự số.");
      }

      if(email.lastIndexOf("@gmail.com") + 10 != email.length){
        return res.json("Email không hợp lệ");
      }

      const salt = await bcrypt.genSalt(10);
      const hashed = await bcrypt.hash(password, salt);
      
      // create new user
      const newUser = await new Account({
        email: email,
        password: hashed,
      });

      // save to DB
      const user = await newUser.save();
      return res.status(200).render("login");
    } catch (error) {
      res.status(500).json(error);
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
        return res.status(404).json("Email không tồn tại");
      }
      const validPassword = await bcrypt.compare(
        req.body.password,
        user.password
      );
      if (!validPassword) {
        return res.status(404).json("Sai mật khẩu");
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
            return res.render("userhome", { books });
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
    // return res.status(200).json("logged out !");
    Book.find({})
      .then((books) => {
        books = multipleMongooseToObject(books);
        return res.render("home", { books });
      })
      .catch((err) => console.log(err));
  },

  forgot: async(req , res) => {
    let email = req.body.forgotemail;
    const findUser = await Account.findOne({ email: email });
      if (!findUser) {
        return res.json("Tài khoản này không tồn tại");
      }
    try{
      res.render("confirmforgot");
    } catch (error){
      res.json(error);
    }
  },

  confirmforgot: async(req,res) => {
    try{
      res.render("changepassword"); 
    } catch (error){
      res.json(error);
    }
  },

  changepassword: async(req,res) => {
    try{
      res.render("login");
    } catch (error){
      res.json(error);
    }
  },

};

module.exports = authController;
