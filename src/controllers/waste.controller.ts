import { Request, Response } from 'express';
const Waste = require('../models/waste.model');

exports.getAll = async (req: Request, res: Response) => {
  try {
    const waste = await Waste.find({});
    res.json(waste);
  } catch (err) {
    res.status(400).json({
      error: 'Failed to retrieve all wastes',
    });
  }
};

exports.updateIsCollected = async (req: Request, res: Response) => {
  try {
    const waste = await Waste.findByIdAndUpdate(req.params.id, {
      is_collected: req.body.is_collected,
    });
    res.json(waste);
  } catch (err) {
    res.status(400).json({
      error: 'Failed to update is_collected',
    });
  }
};

exports.deleteWaste = async (req: Request, res: Response) => {
  try {
    const waste = await Waste.findByIdAndDelete(req.params.id);
    res.json(waste);
  } catch (err) {
    res.status(400).json({
      error: 'Failed to delete waste',
    });
  }
};
