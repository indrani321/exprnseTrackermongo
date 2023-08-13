require('dotenv').config(); 
const nodemailer = require("nodemailer");
const bcrypt = require('bcrypt');
const uuid = require("uuid");
const User = require('../models/user');
const ForgetPassword = require('../models/forgetpassword'); 

const postForgetPassword = async (req, res, next) => {
  const email = req.body.email;
  try {
    const user = await User.findOne({ email });
    if (user) {
      const forgetpasswordcreate = await ForgetPassword.create({ userId: user._id, active: true });
      
      const transporter = nodemailer.createTransport({
        host: process.env.BREVO_HOST,
        port: 587,
        auth: {
          user: process.env.USER,
          pass: process.env.PASS,
        },
      });

      const msg = {
        from: "sender@example.com",
        to: email,
        subject: "Password Reset",
        text: "and easy to do anywhere, even with Node.js",
        html: `<a href="http://localhost:4000/resetpassword/${forgetpasswordcreate._id}">Click to Reset Password</a>`,
      };

      await transporter.sendMail(msg);
      res.status(201).json({ message: "Link to reset password sent to your mail" });
    }
  } catch (err) {
    console.log(err);
  }
};

module.exports = { postForgetPassword };
