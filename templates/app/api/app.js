import express from 'express'
import bodyParser from 'body-parser'
import morgan from 'morgan'
import path from 'path'
import localisation from 'chemist/dist/middleware/localisation'

const app = express()

app.use(morgan('API :method :url :status :response-time ms - :res[content-length]'))
app.use(bodyParser.json())
app.use(localisation({
  resourcePath: path.join(__dirname, '../config/locales/{{lng}}/{{ns}}.json')
}))

// Controllers here

export default app
