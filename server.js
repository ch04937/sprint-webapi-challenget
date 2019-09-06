//dependencies
const express = require('express');
const helmet = require('helmet');


const server = express();


//global middleware
server.use(express.json());
server.use(helmet());

//route handlers
const projectRouter = require('./routes/projectRouter.js');
const actionsRouter = require('./routes/actionsRouter.js');

//local middleware - routers
server.use('/api/project', projectRouter);
server.use('/api/actions', actionsRouter);

//test for a working server
server.get('/', (req, res) => {
    res.send(`its working its working`)
});

module.exports= server;