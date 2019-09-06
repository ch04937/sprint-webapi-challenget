const express = require('express');

server = express();

//global middleware
server.use(express.json());

//test for a working server
server.get('/', (req, res) => {
    res.send(`its working its working`)
})

module.exports= server;