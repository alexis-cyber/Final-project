const { User, adminUser } = require("../Models/UserModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const verifyToken = require("../Middleware/auth");

const register = async (req, res) => {
  try {
    let { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .send({ msg: "Both email and password are required." });
    }
    let adminUserFound = await adminUser.findOne({ email });
    let userFound = await User.findOne({ email });
    if (userFound || adminUserFound) {
      return res.send({
        msg: "This email already exists, login or register with another email.",
      });
    }
    
    const realAdmin = email === process.env.REAL_ADMIN;

    let hashPassword = await bcrypt.hash(password, +process.env.SALT_ROUND);
    if (realAdmin) {
      await adminUser.create({ email, password: hashPassword });
    } else {
      await User.create({ email, password: hashPassword });
    }
    return res.send({ msg: "Registered successfully" });
  } catch (error) {
    res.status(500).send({ msg: "Internal server error" });
  }
};
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .send({ msg: "Both email and password are required." });
    }

    let adminViewer = await adminUser.findOne({ email });
    let simpleViewer = await User.findOne({ email });

    if (adminViewer || simpleViewer) {
      let user = adminViewer || simpleViewer; 
      let validPassword = await bcrypt.compare(password, user.password);

      if (!validPassword) {
        return res.status(401).send({ msg: "Invalid password" });
      } else {
        let token = jwt.sign(
          {
            email: user.email,
            id: user._id,
          },
          process.env.TOKEN_KEY,
          { expiresIn: "1h" }
        );
        res.status(200).send({ msg: "Logged in successfully.", token });
      }
    } else {
      return res.status(404).send({ msg: "Invalid email." });
    }
  } catch (err) {
    console.log(err);
    res.status(500).send({ msg: "Internal server error. Login failed." });
  }
};



module.exports = { register, login };
