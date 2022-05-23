import { sequelize } from '../db.js'
import { File } from '../models/index.js'
import * as path from 'path'
import { fileURLToPath } from 'url'
import { createDirectorie } from '../utils.js'

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

		const registeredFile = await File.create({ extension, systemId: system.id }, { transaction })

		createDirectorie(storagePath + '/' + system.name)

		const filename = `${registeredFile.id}.${extension}`
		file.mv(path.join(storagePath, system.name, filename))

		const fileData = registeredFile.dataValues

		await transaction.commit()

		response.status(200).json({ createdAt: fileData.createdAt, filename })
	} catch (error) {
		await transaction.rollback()
		next(error)
	}
}

export const getFile = async (request, response, next) => {
	try {
		const { name } = request.params
		// const data = [
		// 	{
		// 		id: '5e9f9b8f-f8c1-4b1c-b8e8-f8f8f8f8f8f8',
		// 		extension: 'jfif',
		// 		systemId: 1,
		// 		path: 'rrhh/5e9f9b8f-f8c1-4b1c-b8e8-f8f8f8f8f8f8.jfif'
		// 	}
		// ]
		const id = name.split('.')[0]
		// const findedFile = data.find(file => file.id === id)
		const findedFile = await File.findByPk(id)
		if (!findedFile) throw Error('File not found')
		const filepath = storagePath + '/System 2/' + findedFile.id + '.' + findedFile.extension
		response.sendFile(filepath)
	} catch (error) {
		next(error)
	}
}
