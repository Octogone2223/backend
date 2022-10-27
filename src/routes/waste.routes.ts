import { Express } from 'express';
const {
  getAll,
  getOne,
  createOne,
  updateIsCollected,
  deleteWaste,
} = require('../controllers/waste.controller');

const BASE_URL = '/wastes';

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
 *         - expiration_date
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
 *         is_collected:
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
module.exports = (app: Express) => {
/**
 * @swagger
 * path:
 * /wastes:
 *   get:
 *    summary: List all wastes
 *    tags: [Waste]
 *    responses:
 *      "200":
 *        description: Returns a list of wastes.
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Waste'
 */
  app.get(`${BASE_URL}`, getAll);
  /**
 * @swagger
 * path:
 * /wastes/{id}:
 *   get:
 *    summary: Return a single waste record
 *    tags: [Waste]
 *    responses:
 *      "200":
 *        description: Returns a single waste record.
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Waste'
 */
  app.get(`${BASE_URL}/:id`, getOne);
 /**
 * @swagger
 * path:
 * /wastes:
 *   post:
 *    summary: Creates a new waste record
 *    tags: [Waste]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Waste'
 *    responses:
 *      "201":
 *        description: Returns the created waste record.
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Waste'
 */
  app.post(`${BASE_URL}`, createOne);
  /**
 * @swagger
 * put:
 * /wastes/{id}:
 *   put:
 *    summary: Updates an existing waste record
 *    tags: [Waste]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Waste'
 *    responses:
 *      "200":
 *        description: Returns the updated waste.
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Waste'
 */
  app.put(`${BASE_URL}/:id`, updateIsCollected);
 /**
 * @swagger
 * path:
 * /wastes/{id}:
 *   delete:
 *    summary: Delete an existing waste record
 *    tags: [Waste]
 *    responses:
 *      "200":
 *        description: Returns the updated waste record.
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Waste'
 */
  app.delete(`${BASE_URL}/:id`, deleteWaste);
};
