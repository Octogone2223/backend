import { Express } from 'express';
const { getOne } = require('../controllers/user.controller');

module.exports = (app: Express) => {
  app.use('/user/:id', getOne);
};
