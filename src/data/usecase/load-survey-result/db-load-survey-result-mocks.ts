import { LoadSurveyResultRepository, SurveyResultModel } from './db-load-survey-result-protocols'
import { makeFakeSurveyResultModelRepo } from '../save-survey-result/db-save-survey-result-mocks'

export const makeLoadSurveyResultRepositoryStub = (): LoadSurveyResultRepository => ({
  load: async (): Promise<SurveyResultModel> => (makeFakeSurveyResultModelRepo())
})
