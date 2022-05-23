import { sequelize } from './db.js'
import './models/index.js'
import { userSeed } from './seeders/user.js'
import { systemSeed } from './seeders/system.js'

sequelize.query('SET FOREIGN_KEY_CHECKS = 0', { raw: true }).then(function () {
	sequelize.sync({ force: true })
		.then(() => {
			console.log('Migration complete')
			userSeed()
			systemSeed()
			console.log('Seed complete')
		})
		.catch(error => console.error('Migration error', error.name, { error }))
})
