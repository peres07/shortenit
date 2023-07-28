import express, { type RequestHandler } from 'express'

import shortenedController from '../controllers/shortenedController.js'

const router = express.Router()

router.get('/:url', shortenedController as RequestHandler)

export default router
