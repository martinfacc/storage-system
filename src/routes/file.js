import express from 'express'
import {
	uploadFile,
	getFile,
	getFilesOfSystem,
	deleteFile,
} from '../controllers/file.js'
import identificationExtractor from '../middlewares/identificationExtractor.js'
import sessionExtractor from '../middlewares/sessionExtractor.js'

const fileRouter = express.Router()

// fileRouter.use(identificationExtractor)

fileRouter.get('/:name', getFile)
fileRouter.get('/', sessionExtractor, identificationExtractor, getFilesOfSystem)
fileRouter.post('/', identificationExtractor, uploadFile)
fileRouter.delete('/:name', identificationExtractor, deleteFile)

export default fileRouter
