import express from 'express'
import { config } from 'dotenv'
import bodyParser from 'body-parser'
import morgan from 'morgan'
import { Routes } from './constants/routes'
import { notFound } from './middlewares/notfound'
import { connectDB } from './helpers/connectDB'
import { errorsHandler } from './helpers/errorsHandler'
import apiRoute from './routes/apiRoute'

config()

const app = express()
const port = process.env.PORT

app.use(bodyParser.json())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms'))

app.use(Routes.API, apiRoute)
app.use(Routes.ALL, notFound)
app.use(errorsHandler)

app.listen(port, async () => {
  await connectDB()
  console.log('app listen on' + port)
})
