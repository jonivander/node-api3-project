const express = require('express');
const helmet = require('helmet');

const postRouter = require('./posts/postRouter');
const userRouter = require('./users/userRouter');

const server = express();

server.use(express.json());
server.use(helmet());
server.use(logger());

server.use('/api/posts', postRouter);
server.use('/api/users', userRouter);
server.use('/', (req, res) => {res.send('Hello World!')});

server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});


//custom middleware

function logger() {
  return (req, res, next) => {
    console.log(`a ${req.method} request was made to ${req.url}`);

    next(); 
  };
}

module.exports = server;
