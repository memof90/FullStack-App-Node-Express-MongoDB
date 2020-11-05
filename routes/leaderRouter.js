const express = require('express');
const bodyParser = require('body-parser');


const leaderRouter = express.Router();

leaderRouter.use(bodyParser.json());

leaderRouter.route('/')
//call all method
.all((req,res,next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
})
//get method
.get((req,res,next) => {
    res.end('Will send all the leaders you!');
})
// post method 
.post((req,res,next) => {
    res.end('Will add the leader: ' + req.body.name + 
    ' with details: ' + req.body.description);
})
// put method
.put((req,res,next) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /leaders');
})
//delete method
.delete((req,res,next) => {
    res.end('Deleting all the leaders!');
})

//new route 
leaderRouter.route('/:leaderId')
//call method with params dish: => id
//get method
.get((req,res,next) => {
    res.end('Will send leaders of the dish: ' + 
    req.params.leaderId + ' to you!');
})
// post method 
.post((req,res,next) => {
    res.statusCode = 403;
    res.end('POST operation not supported on /leaders/' + req.params.leaderId);
})
// put method
.put((req,res,next) => {

    res.write('Updating the leader: ' + req.params.leaderId + '\n');
    res.end('Will update the leader: ' + req.body.name + 'with details: ' + req.body.description)
})
//delete method
.delete((req,res,next) => {
    res.end('Deleting leader: ' + req.params.leaderId);
});

module.exports = leaderRouter;