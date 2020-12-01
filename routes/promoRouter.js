const express = require('express');

const bodyParser = require('body-parser');

const mongoose = require('mongoose');

const Promotions = require('../models/promotions');

const authenticate = require('../authenticate');

const cors = require('./cors');


const promosRouter = express.Router();

promosRouter.use(bodyParser.json());

promosRouter.route('/')
.options(cors.corsWithOptions, (req, res) => {res.sendStatus(200);})
//get method
.get(cors.cors,(req,res,next) => {
    Promotions.find(req.query)
    .then((promotions) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(promotions);
    }, (err) => next(err))
    .catch((err) => next(err));
})
// post method 
.post(cors.corsWithOptions,authenticate.verifyUser,(req,res,next) => {
   Promotions.create(req.body)
   .then((promotion) => {
       console.log('Promotion created', promotion);
       res.statusCode = 200;
       res.setHeader('Content-Type', 'application/json');
       res.json(promotion);
   }, (err) => next(err))
   .catch((err) => next(err));
})
// put method
.put(cors.corsWithOptions,authenticate.verifyUser,(req,res,next) => {
    res.statusCode = 403;
    res.setHeader('Content-Type', 'text/plain');
    res.end('PUT operation not supported on /promotions');
})
//delete method
.delete(cors.corsWithOptions,authenticate.verifyUser,(req,res,next) => {
    Promotions.deleteMany({})
    .then((resp) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
    }, (err) => next(err))
    .catch((err) => next(err));
})

//new route 
promosRouter.route('/:promoId')
.options(cors.corsWithOptions, (req, res) => {res.sendStatus(200);})
//call method with params dish: => id
//get method
.get(cors.cors,(req,res,next) => {
   Promotions.findById(req.params.promoId)
   .then((promotion) => {
       res.statusCode = 200;
       res.setHeader('Content-Type', 'application/json');
       res.json(promotion);
   }, (err) => next(err))
   .catch((err) => next(err));
})
// post method 
.post(cors.corsWithOptions,authenticate.verifyUser,(req,res,next) => {
    res.statusCode = 403;
    res.setHeader('Content-Type', 'text/plain');
    res.end('POST operation not supported on /promotions/' + req.params.promoId);
})
// put method
.put(cors.corsWithOptions,authenticate.verifyUser,(req,res,next) => {
    Promotions.findByIdAndUpdate(req.params.promoId, {
        $set: req.body
    }, { new: true })
    .then((promotion) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(promotion);
    }, (err) => next(err))
    .catch((err) => next(err));
})
//delete method
.delete(cors.corsWithOptions,authenticate.verifyUser,(req,res,next) => {
   Promotions.findByIdAndRemove(req.params.promoId)
   .then((resp) => {
       res.statusCode = 200;
       res.setHeader('Content-Type', 'application/json');
       res.json(resp);
   }, (err) => next(err))
   .catch((err) => next(err));
});

module.exports = promosRouter;