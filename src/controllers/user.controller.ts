import { Request, Response } from 'express';
const User = require('../models/user.model');

exports.getOne = async (req: Request, res: Response) => {
  const user = await User.findById(req.params.id);
  res.json(user);
};
