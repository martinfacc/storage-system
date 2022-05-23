import { System } from '../models/index.js'

const systems = [
	{ name: 'System 1' },
	{ name: 'System 2' },
	{ name: 'System 3' }
]

export const systemSeed = () => System.bulkCreate(systems)