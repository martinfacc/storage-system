import express from 'express'
import { getSystem, createSystem } from '../controllers/system.js'
import sessionExtractor from '../middlewares/sessionExtractor.js'

const systemRouter = express.Router()

systemRouter.use(sessionExtractor)

systemRouter.get('/', getSystem)
systemRouter.post('/', createSystem)

export default systemRouter
