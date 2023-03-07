import express from 'express';
import * as controller from '../controllers/app.js';

const router = express.Router();

router.get('/translatePapago', controller.papagoTranslate);

router.post('/translateDalle', controller.dalle);

router.post('/chatGPT', controller.chatgpt);

// router.get('/jukebox', controller.jukebox);

export default router;
