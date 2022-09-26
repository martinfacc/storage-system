import { sequelize } from '../database.js'
import '../models/index.js'
import systemSeed from './system/index.js'
import logger from '../logger.js'
import colors from 'colors'

const seed = async () => {
	try {
		await sequelize.query('SET FOREIGN_KEY_CHECKS = 0', { raw: true })
		await sequelize.sync({ force: true })
		await systemSeed()
		logger.info('Seed has been completed successfully.')
		console.log(colors.green('Seed has been completed successfully.'))
	} catch (error) {
		logger.error('Seed error', error.name, error)
		console.log(colors.red('Seed error: '), error.name)
	}
}

seed()
