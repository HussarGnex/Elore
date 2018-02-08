const express = require('express'),
  courseRouter = express.Router(),
  jwt = require('jsonwebtoken');

const router = (Course) => {
  const courseController = require('../controllers/course.server.controller')(Course);

  courseRouter.use('/pending/:id', (req, res, next) => courseController.getCourse(req, res, next));

  courseRouter.route('/pending/:id')
    .patch((req, res) => courseController.addPendingUser(req, res));

  courseRouter.use('/:id', (req, res, next) => courseController.getCourse(req, res, next));

  courseRouter.route('/')
    .get((req, res) => courseController.showAll(req, res));
  courseRouter.route('/:id')
    .get((req, res) => courseController.show(req, res));


  // Tylko dla autoryzowanych użytkowników
  courseRouter.use('/', (req, res, next) => courseController.isAuthorized(req, res, next));

  courseRouter.route('/')
    .post((req, res) => courseController.add(req, res));
  courseRouter.route('/:id')
    .patch((req, res) => courseController.update(req, res))
    .delete((req, res) => courseController.remove(req, res));

  return courseRouter;
}

module.exports = router;
