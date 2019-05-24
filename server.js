const express = require('express');
// const next = require('next');
import next from 'next';

const dev = process.env.NODE_ENV !== 'production';
const app = next({dev});
const handler = app.getRequestHandler();

app.prepare()
    .then(() => {
      const server = express();

      server.get('/', (req, res) => {
        app.render(req, res, '/', {});
      })

      server.listen(3000, () => console.log(`server run @ port 3000`))
    })
    .catch(err => {
      console.error(err.stack);
      process.exit(1);
    })