const express = require('express');
const bodyParser = require('body-parser');

const mongoose = require('mongoose');
const Leaders = require('../models/leaders');
const leaders = require('../models/leaders');

const leaderRouter = express.Router();

leaderRouter.use(bodyParser.json());

leaderRouter.route('/')
//get method
.get((req,res,next) => {
    Leaders.find({})
    .then((leaders) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(leaders);
    },(err) => next(err))
    .catch((err) => next(err));
})
// post method 
.post((req,res,next) => {
   leaders.create(req.body)
   .then((leader) => {
       console.log('Leader Created', leader);
       res.statusCode = 200;
       res.setHeader('Content-Type', 'application/json');
       res.json(leader);
   }, (err) => next(err))
   .catch((err) => next(err));
})
// put method
.put((req,res,next) => {
    res.statusCode = 403;
    res.setHeader('Content-Type', 'text/plain');
    res.end('PUT operation not supported on /leaders');
})
//delete method
.delete((req,res,next) => {
    Leaders.deleteMany({})
    .then((resp) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
    }, (err) => next(err))
    .catch((err) => next(err));
})

//new route 
leaderRouter.route('/:leaderId')
//call method with params dish: => id
//get method
.get((req,res,next) => {
    Leaders.findById(req.params.leaderId)
    .then((leader) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(leader);
    }, (err) => next(err))
    .catch((err) => next(err));
})
// post method 
.post((req,res,next) => {
    res.statusCode = 403;
    res.setHeader('Content-Type', 'text/plain');
    res.end('POST operation not supported on /leaders/' + req.params.leaderId);
})
// put method
.put((req,res,next) => {
    Leaders.findByIdAndUpdate(req.params.leaderId, {
        $set: req.body
    }, { new: true} )
    .then((leader) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(leader);
    }, (err) => next(err))
    .catch((err) => next(err));
})
//delete method
.delete((req,res,next) => {
    leaders.findByIdAndRemove(req.params.leaderId)
    .then((resp) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
    }, (err) => next(err))
    .catch((err) => next(err));
});

module.exports = leaderRouter;