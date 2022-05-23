import express from 'express'
import { uploadFile, getFile } from '../controllers/file.js'
import identificationExtractor from '../middlewares/identificationExtractor.js'

const fileRouter = express.Router()

// fileRouter.use(identificationExtractor)

fileRouter.get('/:name', getFile)
fileRouter.post('/', identificationExtractor, uploadFile)

export default fileRouter
