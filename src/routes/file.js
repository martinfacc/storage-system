import express from 'express'
import {
	uploadFile,
	uploadFileFromJson,
	getFile,
	getBase64File,
	getFilesOfSystem,
	deleteFile,
} from '../controllers/file.js'
import identificationExtractor from '../middlewares/identificationExtractor.js'
import authenticationExtractor from '../middlewares/authenticationExtractor.js'

const fileRouter = express.Router()

fileRouter.get('/:system/:name', getFile)
fileRouter.get(
	'/',
	authenticationExtractor,
	identificationExtractor,
	getFilesOfSystem
)
fileRouter.get('/base64/:system/:name', getBase64File)
fileRouter.post('/', identificationExtractor, uploadFile)
fileRouter.post('/json', identificationExtractor, uploadFileFromJson)
fileRouter.delete('/:name', identificationExtractor, deleteFile)

export default fileRouter
