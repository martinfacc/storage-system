import dotenv from 'dotenv'
dotenv.config()
import { app, server } from './app.js'
import { sequelize } from './database.js'
import express from 'express'
import fileupload from 'express-fileupload'
import cors from 'cors'
import bodyParser from 'body-parser'
import notFound from './middlewares/notFound.js'
import errorHandler from './middlewares/errorHandler.js'
import appRouter from './routes/index.js'
import logger from './logger.js'
import colors from 'colors'

const { APP_PORT } = process.env

app.use(
	cors({
		origin: '*',
		methods: ['GET', 'POST'],
		allowedHeaders: ['Content-Type', 'system-identifier-authorization'],
	})
)
app.use(fileupload())

app.use(bodyParser.json({ limit: '50mb' }))
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }))
app.use(express.json())

app.use('/', appRouter)

app.use(notFound)
app.use(errorHandler)

server.listen(APP_PORT, () => {
	logger.info(`App listening on port ${APP_PORT}!`)
	console.log(colors.green(`App listening on port ${APP_PORT}!`))
	sequelize
		.sync({ force: false })
		.then(() => {
			logger.info('Connection has been established successfully.')
			console.log(colors.green('Connection has been established successfully.'))
		})
		.catch((err) => {
			logger.error('Unable to connect to the database:', err)
			console.log(colors.red('Unable to connect to the database:'), err.name)
		})
})
