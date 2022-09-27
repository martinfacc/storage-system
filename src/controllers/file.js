import { sequelize } from '../database.js'
import { File } from '../models/index.js'
import * as path from 'path'
import { fileURLToPath } from 'url'
import { promises as fs } from 'fs'
import { randomColor, randomString, randomInt } from '../utils/random.js'
import { checkUUID } from '../utils/validation.js'
import { mimeTypes } from '../utils/file.js'
import fsExists from 'fs.promises.exists'
import { toDataURL } from '../utils/qrcode.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const storagePath = path.join(__dirname, '..', '..', 'storage')
const randomPath = path.join(__dirname, '..', '..', 'random')

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

export const uploadFileFromJson = async (request, response, next) => {
	const transaction = await sequelize.transaction()
	try {
		const { file: encodedFile, filename, extension } = request.body
		const system = request.system
		if (!encodedFile || !filename || !extension)
			throw new Error('No file was provided')
		const file = Buffer.from(encodedFile, 'base64')
		const registeredFile = await File.create(
			{
				extension,
				size: file.length,
				systemId: system.id,
			},
			{ transaction }
		)
		const newFilename = `${registeredFile.id}.${extension}`

		const url = path.join(storagePath, newFilename)
		await fs.writeFile(url, encodedFile, { encoding: 'base64' })

		const fileData = registeredFile.dataValues
		await transaction.commit()
		response.status(200).json({ createdAt: fileData.createdAt, newFilename })
	} catch (error) {
		await transaction.rollback()
		next(error)
	}
}

const sendFakeFile = async (request, response, next) => {
	try {
		const { system, name } = request.params

		const fileExists = await fsExists(path.join(randomPath, system, name))
		const extension = name.split('.').pop()
		const mimeType = mimeTypes['.' + extension]

		if (fileExists) {
			if (request.base64) {
				const file = await fs.readFile(path.join(randomPath, system, name))
				const buffer = Buffer.from(file, 'base64')
				response.writeHead(200, {
					'Content-Type': mimeType,
					'Content-Length': buffer.length,
				})
				return response.end(buffer, 'binary')
			} else {
				return response.sendFile(path.join(randomPath, system, name))
			}
		}

		const number = randomInt(500, 2000)

		const base64 = await toDataURL(randomString(number), {
			errorCorrectionLevel: 'L',
			type: mimeType,
			color: {
				dark: randomColor(),
				light: randomColor(),
			},
			quality: Math.random(),
			margin: Math.random(),
		})

		const b64 = base64.slice(22)
		const longB64 = Array.from({ length: 100 }).fill(b64).join('')
		const buffer = Buffer.from(longB64, 'base64')

		const folder = path.join(randomPath, system)
		await fs.mkdir(folder, { recursive: true })
		const url = path.join(folder, name)
		await fs.writeFile(url, buffer, { encoding: 'base64' })

		if (request.base64) {
			response.writeHead(200, {
				'Content-Type': mimeType,
				'Content-Length': buffer.length,
			})
			response.end(buffer, 'binary')
		} else {
			response.status(200).sendFile(url)
		}
	} catch (error) {
		next(error)
	}
}

export const getFile = async (request, response, next) => {
	try {
		const { system, name } = request.params
		const id = name.split('.')[0]

		if (!checkUUID(id)) throw new Error('Invalid file id')

		const findedFile = await File.findOne({
			where: { id, systemId: system },
		})
		if (!findedFile) {
			request.base64 = false
			sendFakeFile(request, response, next)
		} else {
			response.status(200).sendFile(storagePath + '/' + name)
		}
	} catch (error) {
		next(error)
		response.status(404).end()
	}
}

export const getBase64File = async (request, response, next) => {
	try {
		const { system, name } = request.params
		const id = name.split('.')[0]

		if (!checkUUID(id)) throw new Error('Invalid file id')

		const findedFile = await File.findOne({
			where: { id, systemId: system },
		})
		if (!findedFile) {
			request.base64 = true
			sendFakeFile(request, response, next)
		} else {
			const file = await fs.readFile(path.join(storagePath, name))
			const buffer = Buffer.from(file, 'base64')
			const mimeType = mimeTypes['.' + findedFile.extension]
			response.writeHead(200, {
				'Content-Type': mimeType,
				'Content-Length': buffer.length,
			})
			response.end(buffer, 'binary')
		}
	} catch (error) {
		next(error)
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
