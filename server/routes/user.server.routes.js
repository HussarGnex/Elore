const express = require('express'),
  userRouter = express.Router();

const router = (User) => {
  const userController = require('../controllers/user.server.controller')(User);

  userRouter.route('/signin')
    .post((req, res) => userController.signIn(req, res));
  userRouter.route('/')
    .get((req, res) => userController.showAll(req, res))
    .post((req, res) => userController.add(req, res));

  userRouter.use('/', (req, res, next) => userController.isAuthorized(req, res, next));

  userRouter.use('/:id', (req, res, next) => userController.getUser(req, res, next));

  userRouter.route('/:id')
    .get((req, res) => userController.show(req, res))
    .patch((req, res) => userController.update(req, res))
    .delete((req, res) => userController.remove(req, res));

  return userRouter;
};

module.exports = router;
