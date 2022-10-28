import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import todoController from './controllers/todoController.js'

const app = express()

app.use(cors({ origin: '*' }))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(todoController)

export default app
