// import express from 'express';
// import cors from 'cors';
// import morgan from 'morgan';
// import helmet from 'helmet';
// import router from './router/app.js';

const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet');
const router = require('./router/app.js');

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: '*',
  })
);
app.use(helmet());
app.use(morgan('tiny'));

app.use('/apiTest', router);

app.use((req, res, next) => {
  res.sendStatus(404);
});

app.use((err, req, res, next) => {
  console.error(err);
  res.sendStatus(500);
});

const port = 4000;

app.listen(port, () => {
  console.log(`🚀 SERVER started at ${port}`);
});
