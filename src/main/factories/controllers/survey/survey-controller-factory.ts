import { AddSurveyController } from '../../../../presentation/controllers/survey/add-survey/add-survey-controller'
import { Controller } from '../../../../presentation/protocols'
import { makeAddSurvey } from '../../usecases/survey/db-add-survey-factory'
import { makeSurveyValidator } from './survey-validator'

export const makeSurveyController = (): Controller => {
  return new AddSurveyController(makeSurveyValidator(), makeAddSurvey())
}
