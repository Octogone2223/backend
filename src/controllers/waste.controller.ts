import { Request, Response } from 'express';
const Waste = require('../models/waste.model');

exports.getAll = async (req: Request, res: Response) => {
  try {
    const wastes = await Waste.find({});
    res.json(wastes);
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

exports.getOne = async (req: Request, res: Response) => {
  try {
    const waste = await Waste.findById(req.params.id);
    if (!waste) {
      return res.status(404).json({
        error: 'Waste record not found',
      });
    }
    res.json(waste);
  } catch (err) {
    res.status(400).json({
      error: 'Failed to retrieve the waste',
    });
  }
};
exports.createOne = async (req: Request, res: Response) => {
  const newWaste = new Waste(req.body);
  newWaste.save((err: any, data: any) => {
    if (err) {
      return res.status(400).json({
        error: 'Failed to create a new waste',
      });
    }

    res.json(data);
  });
};
