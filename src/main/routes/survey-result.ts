/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express'
import { auth } from '../middlewares/auth'
import { adaptRoute } from '../adapters/express/express-route-adapter'
import { makeSaveSurveyResultController } from '../factories/controllers/survey-result/save-survey-result-controller-factory'

export default (router: Router): void => {
  router.put('/surveys/:surveyId/results', auth, adaptRoute(makeSaveSurveyResultController()))
}
