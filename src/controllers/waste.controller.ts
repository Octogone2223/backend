import { Request, Response } from "express";
const Waste = require("../models/waste.model");

exports.getAll = async (req: Request, res: Response) => {
  try {
    const waste = await Waste.find({});
    res.json(waste);
  } catch (err) {
    res.status(400).json({
      error: "Failed to retrieve all wastes",
    });
  }
};
