import { badRequest } from './components'
import { loginPath } from './paths'
import { accountSchema, erroSchema, loginParamsSchema } from './schemas'

export default {
  openapi: '3.0.0',
  info: {
    title: 'Clean Node API 2',
    description: 'API para realizar enquete entre programadores',
    version: '1.0.0'
  },
  servers: [
    { url: '/api' }
  ],
  tags: [
    { name: 'Login' }
  ],
  paths: {
    '/login': loginPath
  },
  schemas: {
    account: accountSchema,
    loginParams: loginParamsSchema,
    error: erroSchema
  },
  components: {
    badRequest
  }
}
