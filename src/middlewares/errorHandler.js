import logger from '../logger.js'

const errorDictionary = {}

const errorHandler = (error, request, response) => {
	logger.error('Error handler', error.name, error)
	const errorName = error.name === 'Error' ? error.message : error.name
	let errorElement = errorDictionary[errorName]
	if (!errorElement) {
		errorElement = {
			status: 500,
			message: 'Internal server error',
		}
	}
	response.status(errorElement.status).json({
		error: errorElement.message,
	})
}

export default errorHandler
