
const path = require('path');
const db = require('../database/db');
const User = require('../models/user');
const jwt = require('jsonwebtoken');

function generateAccessToken(id,ispremiumuser) {
  const secretKey = 'yourkey'; // Replace with your secret key
  const token = jwt.sign({ userId: id ,ispremiumuser:ispremiumuser}, secretKey);
  return token;
}
module.exports={generateAccessToken,}