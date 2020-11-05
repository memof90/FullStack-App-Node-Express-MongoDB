const express = require('express');

const bodyParser = require('body-parser');


const promosRouter = express.Router();

promosRouter.use(bodyParser.json());

promosRouter.route('/')
//call all method
.all((req,res,next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
})
//get method
.get((req,res,next) => {
    res.end('Will send all the promotions you!');
})
// post method 
.post((req,res,next) => {
    res.end('Will add the promo: ' + req.body.name + 
    ' with details: ' + req.body.description);
})
// put method
.put((req,res,next) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /promotions');
})
//delete method
.delete((req,res,next) => {
    res.end('Deleting all the promotions!');
})

//new route 
promosRouter.route('/:promoId')
//call method with params dish: => id
//get method
.get((req,res,next) => {
    res.end('Will send promotions of the promo: ' + 
    req.params.promoId + ' to you!');
})
// post method 
.post((req,res,next) => {
    res.statusCode = 403;
    res.end('POST operation not supported on /promotions/' + req.params.promoId);
})
// put method
.put((req,res,next) => {

    res.write('Updating the promotion: ' + req.params.promoId + '\n');
    res.end('Will update the promotion: ' + req.body.name + 'with details: ' + req.body.description)
})
//delete method
.delete((req,res,next) => {
    res.end('Deleting promotion: ' + req.params.promoId);
});

module.exports = promosRouter;