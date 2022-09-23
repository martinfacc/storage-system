import { sequelize } from './database.js'
import './models/index.js'
import logger from './logger.js'

const migrate = async () => {
	try {
		await sequelize.query('SET FOREIGN_KEY_CHECKS = 0', { raw: true })
		await sequelize.sync({ force: true })
		logger.info('Migration has been completed successfully.')
	} catch (error) {
		logger.error('Migration error', error.name, error)
	}
}

migrate()
