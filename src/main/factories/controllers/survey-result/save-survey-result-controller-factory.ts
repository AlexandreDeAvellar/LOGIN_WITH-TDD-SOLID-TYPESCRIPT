import { Controller } from '../../../../presentation/protocols/controller'
import { SaveSurveyResultController } from '../../../../presentation/controllers/survey-result/save-survey-result/save-survey-result-controller'
import { makeDbLoadSurveyById } from '../../usecases/survey/db-load-survey-by-id-factory'
import { makeDbSaveSurveyResult } from '../../usecases/survey-result/db-save-survey-result-factory'
import { makeLogControllerDecorator } from '../../decorators/log-controller-decorator-factory'

export const makeSaveSurveyResultController = (): Controller => {
  const saveSurveyResultController = new SaveSurveyResultController(makeDbLoadSurveyById(), makeDbSaveSurveyResult())
  return makeLogControllerDecorator(saveSurveyResultController)
}
