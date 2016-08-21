import express from 'express'
import cookieParser from 'cookie-parser'
import bodyParser from 'body-parser'
import morgan from 'morgan'
import path from 'path'
import localisation from 'chemist/dist/middleware/localisation'

import rendering from './middleware/rendering'
import api from './middleware/api'

const app = express()

app.use(morgan('dev'))
app.use(cookieParser())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, '..', 'static')))
app.use(localisation({
  resourcePath: path.join(__dirname, '../config/locales/{{lng}}/{{ns}}.json')
}))

app.use('/api', api())

// Controllers here

app.use(rendering())

export default app
