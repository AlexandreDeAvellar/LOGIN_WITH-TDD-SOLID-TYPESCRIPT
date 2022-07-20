import { loginPath, surveyPath, signupPath, surveyResultPath } from './paths/'

export default {
  '/login': loginPath,
  '/surveys': surveyPath,
  '/signup': signupPath,
  '/surveys/{surveyId}/results': surveyResultPath
}
