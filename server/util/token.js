import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    // time after which token expires 
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

export default generateToken;