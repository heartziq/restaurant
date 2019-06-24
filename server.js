const express = require('express');
const next = require('next');
const apiRouter = require('./api');
const fetch = require('isomorphic-unfetch');

const { verify } = require('./api/middleware');

const dev = process.env.NODE_ENV !== 'production';
const app = next({dev});

const r = app.getRequestHandler();

app
  .prepare()
  .then(() => {
    const server = express();
    server.use('/api', apiRouter);

    server.get('/lol', (req, res) => {
      res.send('lolback')
    })

    server.get('/collection', verify, (req, res) => {
      // just display dummy data for now
      res.json({"msg": "hey"})
    })

    server.get('/', async (req, res) => {
      // query initial data
      console.log('calling \'/\' endpoint...')
      const response = await fetch('http://localhost:3000/api');
      const initialData = await response.json();

      app.render(req, res, '/browse', {initialData});

    })

    // must-have path
    server.get('*', (req, res) => {
      return r(req, res)
    })

    server.listen(3000, err => {
      if (err) throw err;
      console.log('server listening at port: 3000');
    })
  })
  .catch(err => {
    console.error(err.stack);
    process.exit(1);
  })