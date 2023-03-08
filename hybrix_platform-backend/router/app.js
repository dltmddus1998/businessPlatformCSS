// import express from 'express';
// import * as controller from '../controllers/app.js';

const express = require('express');
const { papagoTranslate, dalle, chatgpt, elaiVideo } = require('../controllers/app.js');

const router = express.Router();

router.get('/translatePapago', papagoTranslate);

router.post('/translateDalle', dalle);

router.post('/chatGPT', chatgpt);

router.post('/elai', elaiVideo);

// router.get('/jukebox', controller.jukebox);

// export default router;

module.exports = router;
