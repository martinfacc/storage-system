import User from '../models/user.js'
import bcrypt from 'bcrypt'

const hashPassword = async (password) => {
	const salt = await bcrypt.genSalt(10)
	return await bcrypt.hash(password, salt)
}

export const signup = async (request, response, next) => {
	try {
		const newUser = request.body
		const hashedPassword = await hashPassword(newUser.password)
		const registeredUser = await User.create({
			...newUser,
			password: hashedPassword
		})

		const { password: savedPassword, ...userData } = registeredUser.dataValues

		response.status(200).json(userData)
	} catch (error) {
		next(error)
	}
}

export const login = async (request, response, next) => {
	try {
		const { email, password } = request.body
		const findedUser = await User.findOne({
			where: { email }
		})
		const isPasswordValid = await bcrypt.compare(password, findedUser?.password)
		if (!isPasswordValid) throw Error('Email or password incorrect')

		const { password: savedPassword, ...userData } = findedUser.dataValues

		request.session.userId = userData.id

		response.status(200).json(userData)
	} catch (error) {
		next(error)
	}
}

export const logout = async (request, response, next) => {
	try {
		delete request.session.user
		response.status(200).end()
	} catch (error) {
		next(error)
	}
}
