import express, { type RequestHandler } from 'express'

import randomController from '../controllers/shortenUrlControllers/randomUrlController.js'
import customController from '../controllers/shortenUrlControllers/customUrlController.js'

const router = express.Router()

router.post('/random-url', randomController as RequestHandler)
router.post('/custom-url', customController as RequestHandler)

export default router
