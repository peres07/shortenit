import express, { type RequestHandler } from 'express'

import shortenController from '../controllers/shortenController.js'

const router = express.Router()

router.post('/shorten-url', shortenController as RequestHandler)

export default router
