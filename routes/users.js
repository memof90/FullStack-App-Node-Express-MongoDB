var express = require('express');
const bodyParser = require('body-parser');

var User = require('../models/user');
var passport = require('passport');

var authenticate = require('../authenticate');
const cors = require('./cors');

var router = express.Router();

router.use(bodyParser.json());

/* GET users listing. */
router.get('/', cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
  User.find({}, (err, users) => {
    if (err) {
      return next(err);
    } else {
      res.statusCode = 200;
      res.setHeader('Content-type', 'application/json');
      res.json(users);
    }
  });
});

router.post('/signup', cors.corsWithOptions, function(req, res, next){
  User.register(new User({username: req.body.username}), 
  req.body.password, (err, user) => {
    if (err) {
      res.statusCode = 500;
      res.setHeader('Content-Type', 'application/json');
      res.json({err: err});
    }
    else {
      if (req.body.firstname)
      user.firstname = req.body.firstname;
      if (req.body.lastname)
      user.lastname = req.body.lastname;
      user.save((err,user) => {
        if (err) {
          res.statusCode = 500;
          res.setHeader('Content-Type', 'application/json');
          res.json({err: err});
          return ;
        }
        passport.authenticate('local')(req,res, () => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json({success: true, status: 'Registration Sucessful!'});
      });
      });
    }
  });
});

router.post('/login', cors.corsWithOptions, passport.authenticate('local'), (req, res) => {
  // crear el token 
  var token = authenticate.getToken({_id: req.user._id});
  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/json');
  res.json({success: true, token: token, status: 'You are Successfully logeed in!'});

});

router.get('/logout',cors.corsWithOptions, (req,res) => {
  if ( req.session) {
    req.session.destroy();
    res.clearCookie('session-id');
    //redireccionar a l home page colocamos aqui la pagina de inicio
    res.redirect('/');
  }
  else {
    var err = new Error('You are not logged!');
    err.status = 403;
    next(err);
  }
});

router.get('/facebook/token', passport.authenticate('facebook-token'), (req, res) => {
  if (req.user) {
    var token = authenticate.getToken({_id: req.user._id});
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.json({success: true, token: token, status: 'You are Successfully logeed in!'});
  }
})

module.exports = router;
