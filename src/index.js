import dotenv from 'dotenv'
dotenv.config()

import { sequelize } from './db.js'

import express from 'express'
import fileupload from 'express-fileupload'
import cors from 'cors'
import session from 'express-session'
import { sessionStore } from './session.js'
import logger from './logger.js'
import notFound from './middlewares/notFound.js'
import errorHandler from './middlewares/errorHandler.js'
import userRouter from './routes/user.js'
import systemRouter from './routes/system.js'
import fileRouter from './routes/file.js'
import bodyParser from 'body-parser'

const { APP_PORT } = process.env
const app = express()


app.use(cors({
	origin: '*',

	methods: [
		'GET',
		'POST',
	],

	allowedHeaders: [
		'Content-Type',
	],
}))
app.use(express.json())
app.use(fileupload())
app.use(logger)
app.use(session({
	key: 'session_cookie_name',
	secret: 'session_cookie_secret',
	store: sessionStore,
	resave: false,
	saveUninitialized: false
}))
app.use(bodyParser.json({ limit: '10mb' }))
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }))

app.use('/api/user', userRouter)
app.use('/api/system', systemRouter)
app.use('/api/file', fileRouter)

app.use(notFound)
app.use(errorHandler)

app.listen(APP_PORT, () => {
	console.log(`App listening on port ${APP_PORT}!`)
	sequelize.sync({ force: false })
		.then(() => console.log('Connection has been established successfully.'))
		.catch(err => console.error('Unable to connect to the database:', err))
})
