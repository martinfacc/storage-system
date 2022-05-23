import { User } from '../models/index.js'
import { hashPassword } from '../controllers/user.js'

const users = [
	{
		firstName: 'Martin',
		lastName: 'Facciuto',
		email: 'martin@facciuto.com',
		password: '123456789',
	}
]

const hashedUsers = await Promise.all(users.map(async user => ({
	...user,
	password: await hashPassword(user.password)
})))

export const userSeed = () => User.bulkCreate(hashedUsers)