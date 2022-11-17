import { Express } from "express";
const { register, login } = require("../controllers/auth.controller");

const BASE_URL = "/auth";

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - username
 *         - password
 *       properties:
 *         _id:
 *           type: ObjectId
 *           description: The auto-generated ID of the user
 *         username:
 *           type: string
 *           description: The username of the user.
 *         password:
 *           type: string
 *           description: The password of the user.
 *       example:
 *          username: "johndoe"
 *          password: "123456"
 */

/**
 * @swagger
 * tags:
 *  name: User
 *  description: API to manage users.
 */
module.exports = (app: Express) => {
  /**
   * @swagger
   * path:
   * /auth/register:
   *   post:
   *    summary: Creates a new user record
   *    tags: [User]
   *    requestBody:
   *      required: true
   *      content:
   *        application/json:
   *          schema:
   *            $ref: '#/components/schemas/User'
   *    responses:
   *      "201":
   *        description: Returns the created user record.
   *        content:
   *          application/json:
   *            schema:
   *              $ref: '#/components/schemas/User'
   */
  app.post(`${BASE_URL}/register`, register);

  /**
   * @swagger
   * path:
   * /auth/login:
   *   post:
   *    summary: Log user in by providing a token
   *    tags: [User]
   *    requestBody:
   *      required: true
   *      content:
   *        application/json:
   *          schema:
   *            $ref: '#/components/schemas/User'
   *    responses:
   *      "200":
   *        description: Returns a token with the user id.
   *        content:
   *          application/json:
   *            schema:
   *              $ref: '#/components/schemas/User'
   */
  app.post(`${BASE_URL}/login`, login);
};
