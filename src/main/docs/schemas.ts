import { accountSchema, erroSchema, loginParamsSchema, surveysSchema, surveySchema, surveyAnswerSchema, signupParamSchema, addSurveyParamsSchema, surveyResultSchema, saveSurveyParamsSchema } from './schemas/'

export default {
  account: accountSchema,
  loginParams: loginParamsSchema,
  error: erroSchema,
  surveys: surveysSchema,
  survey: surveySchema,
  surveyAnswer: surveyAnswerSchema,
  signupParams: signupParamSchema,
  addSurveyParams: addSurveyParamsSchema,
  surveyResult: surveyResultSchema,
  saveSurveyParams: saveSurveyParamsSchema
}
