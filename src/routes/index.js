import express from 'express'
import fileRouter from './file.js'
import systemRouter from './system.js'

const appRouter = express.Router()

appRouter.use('/api/file', fileRouter)
appRouter.use('/api/system', systemRouter)

export default appRouter
