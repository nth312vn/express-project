import express from 'express'
import dotenv from 'dotenv'
import bodyParser from 'body-parser'
import morgan from 'morgan'
import { routes } from './constants/routes'
import { notFound } from './middlewares/notfound'

dotenv.config()

const app = express()
const port = process.env.PORT

app.use(bodyParser.json())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms'))

app.use(routes.ALL, notFound)
app.listen(port, () => {
  console.log('app listen on' + port)
})
