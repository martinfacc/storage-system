import { System } from '../models/index.js'

const identificationExtractor = async (request, response, next) => {
	try {
		const systemIdentification =
			request.headers['system-identifier-authorization']
		if (!systemIdentification) throw new Error('Token not found')
		const system = await System.findByPk(systemIdentification)
		if (!system) throw new Error('System not found')
		request.system = system
		next()
	} catch (error) {
		delete request.system
		next(error)
	}
}

export default identificationExtractor
