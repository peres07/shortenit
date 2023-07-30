import express from 'express';
import totalUrlsController from '../controllers/totalUrlsController.js';
const router = express.Router();
router.get('/total-urls', totalUrlsController);
export default router;
