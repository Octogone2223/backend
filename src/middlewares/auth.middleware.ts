import { NextFunction, Response } from "express";
const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");

export const verifyToken = (req: any, res: Response, next: NextFunction) => {
  const bearerHeader = req.headers["authorization"];

  if (!bearerHeader) {
    return res.status(403).send({
      message: "No token provided",
    });
  } else {
    const bearer = bearerHeader.split(" ");
    const token = bearer[1];

    console.log("[token]: ", token);

    if (!token) {
      return res.status(403).send({
        message: "No token provided",
      });
    }

    jwt.verify(token, config.secret, (err: Error, decoded: any) => {
      if (err) {
        return res.status(401).send({
          message: "Unauthorized!",
        });
      }

      req.userId = decoded.id;
      next();
    });
  }
};

const authJwt = {
  verifyToken,
};

module.exports = authJwt;
