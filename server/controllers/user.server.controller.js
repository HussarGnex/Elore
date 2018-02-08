const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const userController = (User) => {

  const getUser = (req, res, next) => {
    User.findById(req.params.id, (error, user) => {
      if (error) {
        res.status(500).send(error);
      } else if (user) {
        req.user = user;
        next();
      } else {
        res.status(404).send('No user!');
      }
    });
  };

  const add = (req, res) => {
    const newUser = new User({
      login: req.body.login,
      password: bcrypt.hashSync(req.body.password, 10),
      name: req.body.name,
      surname: req.body.surname,
      email: req.body.email,
    });

    newUser.save((error, user) => {
      if (error) {
        console.log(error);
      } else {
        console.log(user);
        res.status(201).send(user);
      }
    });
  };

  const showAll = (req, res) => {
    User.find({}, (error, user) => {
      if (error) {
        console.log(error);
      } else {
        res.status(200).json(user);
        console.log(user);
      }
    });
  };

  const show = (req, res) => {
    console.log(req.user);
    res.status(200).json(req.user);
  };

  const update = (req, res) => {
    console.log('->(2)');
    const decoded = jwt.decode(req.query.token);
    if (req.body._id) {
      delete req.body._id;
    }

    if (req.body.admin && !decoded.user.admin) {
      delete req.body.admin;
    }

    for (let property in req.body) {
      req.user[property] = req.body[property];
    }

    if ((req.user._id != decoded.user._id) && !decoded.user.admin) {
      return res.status(401).json({
        title: 'No authenticated',
        error: {
          message: 'Users do not match'
        }
      });
    }
    req.user.save((error, user) => {
      if (error) {
        res.status(500).send(error);
      } else {
        res.json(user);
      }
    });
  };

  const remove = (req, res) => {
    const decoded = jwt.decode(req.query.token);
    if (!decoded.user.admin) {
      return res.status(401).json({
        title: 'No privileges',
      });
    }
    req.user.remove((error, user) => {
      if (error) {
        res.status(500).send(error);
      } else {
        res.status(200).json(req.params.id);
      }
    });
  };

  const signIn = (req, res) => {
    User.findOne({
      login: req.body.login
    }, (error, user) => {
      if (error) {
        return res.status(500).json(error);
      }
      if (!user) {
        return res.status(401).json('Invalid login credentials')
      }
      if (!bcrypt.compareSync(req.body.password, user.password)) {
        return res.status(401).json('Invalid login credentials')
      }

      const token = jwt.sign({
        user: user,
      }, 'slidufhgsdfyg', {
        expiresIn: 7200,
      });

      res.status(200).json({
        token: token,
        userId: user._id,
      });

    })
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
    signIn: signIn,
    add: add,
    showAll: showAll,
    show: show,
    remove: remove,
    update: update,
    getUser: getUser,
  }
};

module.exports = userController;
