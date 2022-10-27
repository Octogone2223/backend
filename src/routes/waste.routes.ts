import { Express } from 'express';
/**
 * @swagger
 * components:
 *   schemas:
 *     Waste:
 *       type: object
 *       required:
 *         - label
 *         - issuing_company
 *         - quantity
 *         - dlc
 *         - is_collected
 *       properties:
 *         _id:
 *           type: ObjectId
 *           description: The auto-generated ID of the waste
 *         label:
 *           type: string
 *           description: The label of the request.
 *         issuing_company:
 *           type: string
 *           description: Name of the issuing company.
 *         quantity:
 *           type: number,
 *           description: Quantity of waste.
 *         expiration_date:
 *           type: string
 *           description: expiry date
 *        is_collected:
 *           type: boolean
 *           description: Weither the waste was collected or not
 *       example:
 *          label: "Pomme"
 *          issuing_company: "Carrefour"
 *          quantity: 50
 *          expiration_date: "20/12/2022"
 *          is_collected: false
 */

/**
 * @swagger
 * tags:
 *  name: Waste
 *  description: API to manage wastes.
 */

const {
  getAll,
  updateIsCollected,
  deleteWaste,
} = require('../controllers/waste.controller');

module.exports = (app: Express) => {
  app.get('/wastes', getAll);
  app.put('/wastes/:id', updateIsCollected);
  app.delete('/wastes/:id', deleteWaste);
};
