import express from 'express'
import configSwagger from './config-swagger'
import setupMiddlewares from './middlewares'
import setupRoutes from './routes'

const app = express()
configSwagger(app)
setupMiddlewares(app)
setupRoutes(app)
export default app
