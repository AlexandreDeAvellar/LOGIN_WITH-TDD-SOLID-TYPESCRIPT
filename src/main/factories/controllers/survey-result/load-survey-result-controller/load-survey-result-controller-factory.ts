import { Controller } from '../../../../../presentation/protocols'
import { LoadSurveyResultController } from '../../../../../presentation/controllers/survey-result/load-survey-result/load-survey-result-controler'
import { makeDbLoadSurveyById } from '../../../usecases/survey/db-load-survey-by-id-factory'
import { makeDbLoadSurveyResult } from '../../../usecases/survey-result/db-load-survey-result-factory'

export const makeLoadSurveyResultController = (): Controller => {
  return new LoadSurveyResultController(makeDbLoadSurveyById(), makeDbLoadSurveyResult())
}
