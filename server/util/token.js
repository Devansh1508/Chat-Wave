import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import Cookies from "js-cookie";
dotenv.config();

const generateToken = (userId) => {
  const jwtToken=jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    // time after which token expires 
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

  const payLoad={
    token: jwtToken,
    userId: userId
  }
  Cookies.set("token", payLoad, { secure: true, sameSite: "Strict", expires: process.env.JWT_EXPIRES_IN });
  return jwtToken;
};

export default generateToken;
