import dotenv from 'dotenv'
dotenv.config()

const { ADMIN_IDENTIFIER_AUTHORIZATION } = process.env

const authenticationExtractor = async (request, response, next) => {
	try {
		const adminAuthorization = request.headers['admin-authorization']
		if (!adminAuthorization) throw new Error('Token not found')
		if (adminAuthorization !== ADMIN_IDENTIFIER_AUTHORIZATION)
			throw new Error('Token not valid')
		next()
	} catch (error) {
		next(error)
	}
}

export default authenticationExtractor
