import express from 'express'
import { getSystem, createSystem, getSystems, deleteSystem } from '../controllers/system.js'
import sessionExtractor from '../middlewares/sessionExtractor.js'

const systemRouter = express.Router()

systemRouter.use(sessionExtractor)

systemRouter.get('/', getSystems)
systemRouter.get('/:id', getSystem)
systemRouter.post('/', createSystem)
systemRouter.delete('/:id', deleteSystem)

export default systemRouter
