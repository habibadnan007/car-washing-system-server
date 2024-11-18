import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import {
  globalErrHandler,
  notFoundErrHandler,
} from './app/middleware/errHandler'
import router from './app/routes/routes'
import cookieParser from 'cookie-parser'
import cron from 'node-cron'
import axios from 'axios'

const app = express()

const axiosInstance = axios.create({
  timeout: 30000, // 30 seconds timeout
})

//   10 minute
//   */10 * * * *
// Self-ping task

cron.schedule('*/10 * * * *', () => {
  axiosInstance
    .get(`https://car-washing-system.onrender.com`)
    .then((response) => {
      console.log('😀🎉 Self-ping successful after every 10m:', response.status)
    })
    .catch((error) => {
      console.error('😡 Self-ping failed:', error.message)
    })
})

// parser
app.use(
  cors({
    origin: function (origin, callback) {
      // allow requests with no origin (like mobile apps or curl requests)
      if (!origin) return callback(null, true)
      return callback(null, origin)
    },
    credentials: true,
  }),
)
app.use(cookieParser())
app.use(express.json())

// Routes
app.use('/api/v1', router)

// Home route to test server
app.get('/api/v1', (req, res) => {
  res.status(200).send({ success: true, message: 'This is base url!' })
})
app.get('/', (req, res) => {
  res.status(200).send({ success: true, message: 'This is homepage' })
})

// err handling middleware
app.use(notFoundErrHandler)
app.use(globalErrHandler)

export default app
