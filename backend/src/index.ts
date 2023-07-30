import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'

import shortenRoutes from './routes/shortened.js'
import generateRoutes from './routes/shorten.js'
import statisticsRoutes from './routes/statistics.js'

const app = express()

app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }))

app.use('/', shortenRoutes)
app.use('/api', generateRoutes)
app.use('/api/statistics/', statisticsRoutes)

app.listen(3000, () => { console.log('Server running on port 3000') })
