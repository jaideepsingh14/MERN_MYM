const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken')
const User = require("../models/User");

const authenticate = async (req, res, next)=>{
  try {
    // Get the Cookies
    const token = req.cookies.jwt;
    if(!token){
      res.status(401).send("No token")
    }else{
      const verifyToken = jwt.verify(token, process.env.SECRET_KEY);
      const rootUser = await User.findOne({_id : verifyToken._id, "tokens.token" : token});
      if(!rootUser){
        res.status(401).send("User Not Found")
      }else{
        res.status(200).send("Authorized User")
      }
    }
  } catch (error) {
    res.status(401).send("Error")
    console.log(error)
  }
}

const login = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    let user;
    user = await User.findOne({ username });
    if (user) {
      // Verify Password
      const isMatch = await bcryptjs.compare(password, user.password);
      // console.log(`isMatch = ${isMatch}`);

      if (isMatch) {
        // Generate Token Which is Define in User Schema
        const token = await user.generateToken();
        res.cookie("jwt", token)
        res.cookie("userid", user.id)
        res.cookie("username", user.username)
        return res.status(200).json({
          "username": user.username,
          "jwt": token,
          "userid": user.id
        })
      } else {
        return res.status(401).send("Invalid Credentials");
      }
    } else {
      return res.status(401).send("Invalid Credentials");
    }
  } catch (err) {
    console.log(err);
    return res.status(400).send("Server error");
  }
};

const registerUser = async (req, res, next) => {
  try {
    const { email, name, password } = req.body;
    let user;
    user = await User.create({
      email,
      name,
      password
    });
    return res.status(200).send("Registered new user");
  } catch (err) {
    console.log(err);
    return res.status(400).send("Server error");
  }
};

const logout = async (req, res, next) => {
  res.clearCookie("jwt")
  return res.status(200).send("Logged out")
};

exports.authenticate = authenticate;
exports.login = login;
exports.registerUser = registerUser;
exports.logout = logout;
