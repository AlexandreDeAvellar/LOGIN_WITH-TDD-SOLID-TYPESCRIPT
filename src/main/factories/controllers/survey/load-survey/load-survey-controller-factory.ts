import { Controller } from '../../../../../presentation/protocols'
import { LoadSurveysController } from '../../../../../presentation/controllers/survey/load-surveys/load-surveys-controller'
import { makeLogControllerDecorator } from '../../../decorators/log-controller-decorator-factory'
import { makeLoadSurvey } from '../../../usecases/survey/db-load-survey-factory'

export const makeLoadSurveyController = (): Controller => {
  const loadSurveyController = new LoadSurveysController(makeLoadSurvey())
  return makeLogControllerDecorator(loadSurveyController)
}
