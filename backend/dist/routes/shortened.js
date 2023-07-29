import express from 'express';
import shortenedController from '../controllers/shortenedController.js';
const router = express.Router();
router.get('/:url', shortenedController);
export default router;
