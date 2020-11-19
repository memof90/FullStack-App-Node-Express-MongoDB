var express = require('express');
const bodyParser = require('body-parser');

var User = require('../models/user');
var passport = require('passport');

var authenticate = require('../authenticate');

var router = express.Router();

router.use(bodyParser.json());

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/signup', function(req, res, next){
  User.register(new User({username: req.body.username}), 
  req.body.password, (err, user) => {
    if (err) {
      res.statusCode = 500;
      res.setHeader('Content-Type', 'application/json');
      res.json({err: err});
    }
    else {
      passport.authenticate('local')(req,res, () => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json({success: true, status: 'Registration Sucessful!'});
      });
    }
  });
});

router.post('/login', passport.authenticate('local'), (req, res) => {
  // crear el token 
  var token = authenticate.getToken({_id: req.user._id});
  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/json');
  res.json({success: true, token: token, status: 'You are Successfully logeed in!'});

});

router.get('/logout', (req,res) => {
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

module.exports = router;
