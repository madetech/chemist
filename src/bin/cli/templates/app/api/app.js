import express from 'express'
import bodyParser from 'body-parser'
import morgan from 'morgan'
import localisation from 'chemist/middleware/localisation'

const app = express()

app.use(morgan('API :method :url :status :response-time ms - :res[content-length]'))
app.use(bodyParser.json())
app.use(localisation())

// Controllers here

export default app
