import express from 'express';
import * as controller from '../controllers/app.js';

const router = express.Router();

router.get('/translatePapago', controller.papagoTranslate);
// router.get('/translateDalle', controller.dalle);

router.post('/translateDalle', controller.dalle);

export default router;
