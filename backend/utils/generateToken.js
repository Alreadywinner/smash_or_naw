import jwt from "jsonwebtoken";

const generateToken = (res, userId) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
  res.cookie("jwt", token, {
    httpOnly: process.env.NODE_ENV !== "development" ? true : false,
    secure: process.env.NODE_ENV !== "development" ? true : false,
    sameSite: process.env.NODE_ENV !== "development" && "strict",
    token: 30 * 24 * 60 * 60 * 1000,
  });
};

export default generateToken;
