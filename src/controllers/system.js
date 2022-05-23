import { System } from '../models/index.js'

export const createSystem = async (request, response, next) => {
	try {
		const newSystem = request.body
		const registeredSystem = await System.create({
			...newSystem
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
