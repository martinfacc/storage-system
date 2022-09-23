import dotenv from 'dotenv'
dotenv.config()
import Sequelize from 'sequelize'

const { DB_USERNAME, DB_PASSWORD, DB_HOST, DB_PORT, DB_DATABASE } = process.env

export const sequelize = new Sequelize(DB_DATABASE, DB_USERNAME, DB_PASSWORD, {
	host: DB_HOST,
	port: DB_PORT,
	dialect: 'mysql',
	pool: {
		max: 5,
		min: 0,
		acquire: 30000,
		idle: 10000,
	},
})
