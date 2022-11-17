import { NextFunction, Response } from 'express';
const jwt = require('jsonwebtoken');
const config = require('../config/auth.config.js');

export const verifyToken = (req: any, res: Response, next: NextFunction) => {
  const token = req.headers['client_token'];

  if (!token) {
    return res.status(403).send({
      message: 'No token provided!',
    });
  }

  jwt.verify(token, config.secret, (err: Error, decoded: any) => {
    if (err) {
      return res.status(401).send({
        message: 'Unauthorized!',
      });
    }

    req.userId = decoded.id;
    next();
  });
};

const authJwt = {
  verifyToken,
};

module.exports = authJwt;
