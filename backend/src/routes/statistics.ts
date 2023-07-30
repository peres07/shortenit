import express, { type RequestHandler } from 'express'

import totalUrlsController from '../controllers/totalUrlsController.js'

const router = express.Router()

router.get('/total-urls', totalUrlsController as RequestHandler)

export default router
