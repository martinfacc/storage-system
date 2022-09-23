import { System, File } from '../models/index.js'
import { sequelize } from '../database.js'
import * as path from 'path'
import { fileURLToPath } from 'url'
import { promises as fs } from 'fs'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const storagePath = path.join(__dirname, '..', '..', 'storage')

export const createSystem = async (request, response, next) => {
	try {
		const newSystem = request.body
		const registeredSystem = await System.create({
			...newSystem,
		})

		const { ...systemData } = registeredSystem.dataValues

		response.status(200).json(systemData)
	} catch (error) {
		next(error)
	}
}

export const getSystem = async (request, response, next) => {
	try {
		const { id } = request.params
		const system = await System.findByPk(id)
		if (!system) throw Error('System not found')

		const { ...systemData } = system.dataValues

		response.status(200).json(systemData)
	} catch (error) {
		next(error)
	}
}

export const getSystems = async (request, response, next) => {
	try {
		const systems = await System.findAll()
		response.status(200).json(systems)
	} catch (error) {
		next(error)
	}
}

export const deleteSystem = async (request, response, next) => {
	const transaction = await sequelize.transaction()
	try {
		const { id } = request.params
		const system = await System.findByPk(id, { transaction })
		if (!system) throw Error('System not found')

		const files = await File.findAll(
			{ where: { systemId: system.id } },
			{ transaction }
		)
		await Promise.all(files.map(async (file) => file.destroy({ transaction })))

		await Promise.all(
			files.map(async (file) => {
				const name = file.id + '.' + file.extension
				return fs.unlink(storagePath + '/' + name)
			})
		)

		await system.destroy({ transaction })
		await transaction.commit()
		response.status(200).end()
	} catch (error) {
		await transaction.rollback()
		next(error)
	}
}
