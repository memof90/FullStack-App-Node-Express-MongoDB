const express = require('express');

const bodyParser = require('body-parser');


const dishRouter = express.Router();

dishRouter.use(bodyParser.json());


dishRouter.route('/')
//call all method
.all((req,res,next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
})
//get method
.get((req,res,next) => {
    res.end('Will send all the dishes you!');
})
// post method 
.post((req,res,next) => {
    res.end('Will add the dish: ' + req.body.name + 
    ' with details: ' + req.body.description);
})
// put method
.put((req,res,next) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /dishes');
})
//delete method
.delete((req,res,next) => {
    res.end('Deleting all the dishes!');
})
//new route 
dishRouter.route('/:dishId')
//call method with params dish: => id
//get method
.get((req,res,next) => {
    res.end('Will send details of the dish: ' + 
    req.params.dishId + ' to you!');
})
// post method 
.post((req,res,next) => {
    res.statusCode = 403;
    res.end('POST operation not supported on /dishes/' + req.params.dishId);
})
// put method
.put((req,res,next) => {

    res.write('Updating the dish: ' + req.params.dishId + '\n');
    res.end('Will update the dish: ' + req.body.name + 'with details: ' + req.body.description)
})
//delete method
.delete((req,res,next) => {
    res.end('Deleting dish: ' + req.params.dishId);
});

module.exports = dishRouter;