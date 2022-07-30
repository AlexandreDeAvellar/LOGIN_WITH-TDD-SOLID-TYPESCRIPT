import { DbSaveSurveyResult } from '../../../../data/usecase/save-survey-result/db-save-survey-result'
import { SurveyResultMongoRepository } from '../../../../infra/db/mongodb/survey-result/survey-result-mongo-repository'

export const makeDbSaveSurveyResult = (): DbSaveSurveyResult => {
  const surveyResultMongoRepository = new SurveyResultMongoRepository()
  return new DbSaveSurveyResult(surveyResultMongoRepository, surveyResultMongoRepository)
}
