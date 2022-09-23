import express from 'express'
import {
	uploadFile,
	getFile,
	getFilesOfSystem,
	deleteFile,
} from '../controllers/file.js'
import identificationExtractor from '../middlewares/identificationExtractor.js'
import authenticationExtractor from '../middlewares/authenticationExtractor.js'

const fileRouter = express.Router()

fileRouter.get('/:name', getFile)
fileRouter.get(
	'/',
	authenticationExtractor,
	identificationExtractor,
	getFilesOfSystem
)
fileRouter.post('/', identificationExtractor, uploadFile)
fileRouter.delete('/:name', identificationExtractor, deleteFile)

export default fileRouter
