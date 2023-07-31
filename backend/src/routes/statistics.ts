import express, { type RequestHandler } from 'express'

import totalUrlsController from '../controllers/statisticsContollers/totalUrlsController.js'
import urlController from '../controllers/statisticsContollers/urlController.js'

const router = express.Router()

router.get('/get-total', totalUrlsController as RequestHandler)
router.post('/get-url', urlController as RequestHandler)

export default router
