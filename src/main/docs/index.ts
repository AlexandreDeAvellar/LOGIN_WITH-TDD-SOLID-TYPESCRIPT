import { badRequest, notFound, serverError, unauthorized, forbidden } from './components'
import { loginPath, surveyPath, signupPath } from './paths'
import { accountSchema, erroSchema, loginParamsSchema, surveysSchema, surveySchema, surveyAnswerSchema, apiKeyAuthSchema, signupParamSchema, addSurveyParamsSchema } from './schemas'

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
    { name: 'Login' }, { name: 'Enquete' }
  ],
  paths: {
    '/login': loginPath, '/surveys': surveyPath, '/signup': signupPath
  },
  schemas: {
    account: accountSchema,
    loginParams: loginParamsSchema,
    error: erroSchema,
    surveys: surveysSchema,
    survey: surveySchema,
    surveyAnswer: surveyAnswerSchema,
    signupParams: signupParamSchema,
    addSurveyParams: addSurveyParamsSchema
  },
  components: {
    badRequest, notFound, serverError, unauthorized, forbidden, securitySchemes: { apiKeyAuth: apiKeyAuthSchema }
  }
}
