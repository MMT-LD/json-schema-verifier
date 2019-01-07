const express = require('express');
const compression = require('compression')
const morgan = require('morgan');
const { prepareSchemas } = require('../services/ajv-wrapper');

const app = express();

console.time('SERVER TOOK');

(async () => {
  try {
    const { validateRequest } = await prepareSchemas();

    app.use(express.json());
    app.use(compression());
    app.use(morgan('dev'));

    app.get('/', validateRequest('ref'), (req, res) => {
      res.send('Passed!');
    });

    app.post('/example', validateRequest('example'), (req, res) => {
      res.send('Passed!');
    });

    app.post('/nested', validateRequest('request/test1'), (req, res) => {
      res.send('Passed!');
    });

    app.get('/test', validateRequest('test'), validateRequest('veggies'), (req, res) => {
      res.send('Passed!');
    });

    app.use((err, req, res, next) => {
      console.error(
        'ERROR',
        JSON.stringify(err, null, 2),
        err.stack,
        'EEEEE',
        Object.entries(err),
        err.name,
        err.message,
        typeof err.message
      );
      res.status(err.statusCode).send(typeof err.message === 'string' ? { message: err.message } : { ...err.message });
    });

    // Listen
    var port = process.env.PORT || 3000;
    app.listen(port);
    console.timeEnd('SERVER TOOK');
    console.log('Listening on localhost:' + port);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
})();

// UNCOMMENT FOR USE WITH PROMISES
// prepareSchemas().then(({ validateRequest }) => {
//   app.get('/', validateRequest('test1'), (req, res) => {
//     res.send('Hello World!');
//   });

//   app.get('/test', validateRequest('test'), (req, res) => {
//     res.send('Hello World!');
//   });

//   app.use((err, req, res, next) => {
//     res.status(500).send({ error: err.message });
//   });

//   // Listen
//   var port = process.env.PORT || 3000;
//   app.listen(port);
//   console.timeEnd('SERVER TOOK');
//   console.log('Listening on localhost:' + port);
// }).catch((error) => {
//   console.log(error);
//   process.exit(1);
// });
