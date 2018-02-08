const jwt = require('jsonwebtoken'),
  User = require('../models/user.server.model');

const courseController = (Course) => {

  const getCourse = (req, res, next) => {
    Course.findById(req.params.id, (error, course) => {
      if (error) {
        res.status(500).send(error);
        console.log('WTF: ' + req.params.id);
      } else if (course) {
        req.course = course;
        next();
      } else {
        res.status(404).send('No course!');
      }
    });
  };

  const add = (req, res) => {
    const decoded = jwt.decode(req.query.token);
    User.findById(decoded.user._id, (error, user) => {
      if (error) {
        return res.status(500).json({
          title: 'Error occured',
          error: error,
        });
      }

      const newCourse = new Course({
        title: req.body.title,
        description: req.body.description,
        author: user,
      });

      newCourse.save((error, course) => {
        if (error) {
          return res.status(201).json({
            title: 'Unexpected Error',
            error: error,
          });
        }
        user.ownCourses.push(course);
        user.save();
        res.status(201).send({
          title: 'Course saved!',
          course: course,
        });
      });
    });
  };

  const showAll = (req, res) => {
    Course.find({}, (error, course) => {
      if (error) {
        console.log(error);
      } else {
        res.status(200).json(course);
        console.log(course);
      }
    });
  };

  const show = (req, res) => {
    console.log(req.course);
    res.status(200).json(req.course);
  };

  const update = (req, res) => {
    console.log('1');
    const decoded = jwt.decode(req.query.token);
    if (req.body._id) {
      delete req.body._id;
    }
    console.log('2');
    for (let property in req.body) {
      req.course[property] = req.body[property];
    }
    console.log(req.course.author);
    console.log(decoded.user._id);
    if ((req.course.author != decoded.user._id) && !decoded.user.admin) {
      return res.status(401).json({
        title: 'No authenticated',
        error: {
          message: 'Users do not match'
        }
      });
    }
    console.log('4');
    req.course.save((error, course) => {
      if (error) {
        return res.status(500).json(error);
      }
      return res.json(course);
    });
  };

  const addPendingUser = (req, res) => {
    const decoded = jwt.decode(req.query.token);
    User.findById(decoded.user._id, (error, user) => {
      if (error) {
        return res.status(401).json({
          title: 'No authenticated',
          error: {
            message: 'Users do not match'
          }
        });
      }
      req.course.pendingUsers.push(decoded.user._id);
      console.log('!!!!!!!!');
      console.log(req.course.pendingUsers);
      console.log('!!!!!!!!');
      req.course.save((error, course) => {
        if (error) {
          return res.status(500).json(error);
        }
        return res.json(course);
      });
    });
  };

  const remove = (req, res) => {
    const decoded = jwt.decode(req.query.token);
    if ((req.course.author != decoded.user._id) && !decoded.user.admin) {
      return res.status(401).json({
        title: 'No authenticated',
        error: {
          message: 'Users do not match'
        }
      });
    }
    req.course.remove((error, result) => {
      if (error) {
        return res.status(500).json({
          title: 'An error occurred',
          error: error,
        });
      }
      res.status(200).json({
        message: 'Deleted message',
        obj: result,
      });
    });
  };

  const isAuthorized = (req, res, next) => {
    jwt.verify(req.query.token, 'slidufhgsdfyg', (error, decoded) => {
      if (error) {
        return res.status(401).json({
          title: 'No Authentication',
          error: error,
        });
      }
      next();
    });
  };


  return {
    isAuthorized: isAuthorized,
    add: add,
    showAll: showAll,
    show: show,
    remove: remove,
    update: update,
    getCourse: getCourse,
    addPendingUser: addPendingUser,
  }
};

module.exports = courseController;
