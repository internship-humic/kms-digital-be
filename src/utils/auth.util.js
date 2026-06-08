import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import logger from "./logger.util.js";

const generateToken = (data) => {
  return jwt.sign(data, process.env.JWT_SECRET);
};

const parseJWT = (token) => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    logger.error("Invalid token:", error.message);
    return null;
  }
};

const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

const matchPassword = async (password, hash) => {
  return await bcrypt.compare(password, hash);
};

export { generateToken, parseJWT, hashPassword, matchPassword };
