import dotenv from 'dotenv'
dotenv.config()
import log4js from 'log4js'

const { LOG_LEVEL, LOG_FILENAME } = process.env

log4js.configure({
	appenders: { cheese: { type: 'file', filename: LOG_FILENAME } },
	categories: { default: { appenders: ['cheese'], level: LOG_LEVEL } },
})

const logger = log4js.getLogger('logger')

export default logger
