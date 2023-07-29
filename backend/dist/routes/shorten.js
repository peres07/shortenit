import express from 'express';
import shortenController from '../controllers/shortenController.js';
const router = express.Router();
router.post('/shorten-url', shortenController);
export default router;
