import express from 'express';
import totalUrlsController from '../controllers/statisticsContollers/totalUrlsController.js';
import urlController from '../controllers/statisticsContollers/urlController.js';
const router = express.Router();
router.get('/total-urls', totalUrlsController);
router.post('/get-url', urlController);
export default router;
