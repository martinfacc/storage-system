import express from 'express'
import {
	getSystem,
	createSystem,
	getSystems,
	deleteSystem,
} from '../controllers/system.js'
import authenticationExtractor from '../middlewares/authenticationExtractor.js'

const systemRouter = express.Router()

systemRouter.use(authenticationExtractor)

systemRouter.get('/', getSystems)
systemRouter.get('/:id', getSystem)
systemRouter.post('/', createSystem)
systemRouter.delete('/:id', deleteSystem)

export default systemRouter
