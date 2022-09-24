import { sequelize } from '../database.js'
import '../models/index.js'
import systemSeed from './system/index.js'
import logger from '../logger.js'

const seed = async () => {
	try {
		await sequelize.query('SET FOREIGN_KEY_CHECKS = 0', { raw: true })
		await sequelize.sync({ force: true })
		await systemSeed()
		logger.info('Seed has been completed successfully.')
	} catch (error) {
		logger.error('Seed error', error.name, error)
	}
}

seed()
