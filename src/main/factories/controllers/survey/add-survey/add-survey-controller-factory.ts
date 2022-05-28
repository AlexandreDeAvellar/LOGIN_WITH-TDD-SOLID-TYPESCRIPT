import { AddSurveyController } from '../../../../../presentation/controllers/survey/add-survey/add-survey-controller'
import { Controller } from '../../../../../presentation/protocols'
import { makeAddSurvey } from '../../../usecases/survey/db-add-survey-factory'
import { makeSurveyValidator } from './survey-validator'
import { makeLogControllerDecorator } from '../../../decorators/log-controller-decorator-factory'

export const makeAddSurveyController = (): Controller => {
  const surveyController = new AddSurveyController(makeSurveyValidator(), makeAddSurvey())
  return makeLogControllerDecorator(surveyController)
}
