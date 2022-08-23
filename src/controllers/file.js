import { sequelize } from '../db.js'
import { File } from '../models/index.js'
import * as path from 'path'
import { fileURLToPath } from 'url'
import { promises as fs } from 'fs'
// import { createDirectorie } from '../utils.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const storagePath = path.join(__dirname, '..', '..', 'storage')

export const uploadFile = async (request, response, next) => {
	const transaction = await sequelize.transaction()
	try {
		const { file } = request.files
		const system = request.system
		if (!file) throw new Error('No file was provided')
		const extension = file.name.split('.').pop()
		const registeredFile = await File.create(
			{ extension, systemId: system.id },
			{ transaction }
		)
		// createDirectorie(storagePath + '/' + system.name)
		const filename = `${registeredFile.id}.${extension}`
		file.mv(path.join(storagePath, filename))
		const fileData = registeredFile.dataValues
		await transaction.commit()
		response.status(200).json({ createdAt: fileData.createdAt, filename })
	} catch (error) {
		await transaction.rollback()
		next(error)
	}
}

export const getFile = async (request, response) => {
	try {
		const { name } = request.params
		const id = name.split('.')[0]
		const findedFile = await File.findByPk(id)
		if (!findedFile) throw Error('File not found')
		response.status(200).sendFile(storagePath + '/' + name)
	} catch (error) {
		response.status(404).end()
	}
}

export const getFilesOfSystem = async (request, response) => {
	try {
		const system = request.system
		const findedFiles = await File.findAll({ where: { systemId: system.id } })
		response.status(200).json(findedFiles)
	} catch (error) {
		response.status(404).end()
	}
}

export const deleteFile = async (request, response, next) => {
	const transaction = await sequelize.transaction()
	try {
		const { name } = request.params
		const id = name.split('.')[0]
		const findedFile = await File.findByPk(id)
		if (!findedFile || findedFile.systemId !== request.system.id)
			throw Error('File not found')
		await File.destroy({ where: { id } }, { transaction })
		await fs.unlink(storagePath + '/' + name)
		await transaction.commit()
		response.status(200).end()
	} catch (error) {
		await transaction.rollback()
		next(error)
	}
}
