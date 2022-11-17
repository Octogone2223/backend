import { Request, Response } from "express";
const User = require("../models/user.model");
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
const config = require("../config/auth.config");

exports.register = async (req: Request, res: Response) => {
  try {
    req.body.password = bcrypt.hashSync(req.body.password, 10);
    const newUser = new User(req.body);
    newUser.save((err: any, data: any) => {
      if (err) {
        return res.status(400).json({
          error: "Failed to create a new user",
        });
      }
      res.status(201).json(data);
    });
  } catch (err) {
    console.log(err);
    res.status(500).send("Failed to register the new user");
  }
};

exports.login = async (req: Request, res: Response) => {
  try {
    const foundUser = await User.findOne({ username: req.body.username });

    if (!foundUser) {
      return res.status(401).send({
        message: "Username does not exists",
      });
    }

    if (!bcrypt.compareSync(req.body.password, foundUser.password)) {
      return res.status(400).send({ message: "The password is invalid" });
    }

    const token = jwt.sign({ id: foundUser.id }, config.secret, {
      expiresIn: "1h",
    });

    res.status(200).json({
      token,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send("Failed to authenticate the user");
  }
};
