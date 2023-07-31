import express from 'express';
import totalUrlsController from '../controllers/statisticsContollers/totalUrlsController.js';
import urlController from '../controllers/statisticsContollers/urlController.js';
const router = express.Router();
router.get('/get-total', totalUrlsController);
router.post('/get-url', urlController);
export default router;
