import { LoadSurveys } from '../../../../domain/usecases/load-surveys'
import { DbLoadSurveys } from '../../../../data/usecase/load-surveys/db-load-surveys'
import { SurveyMongoRepository } from '../../../../infra/db/mongodb/survey/survey-mongo-repository'

export const makeLoadSurvey = (): LoadSurveys => {
  const surveyMongoRepository = new SurveyMongoRepository()
  return new DbLoadSurveys(surveyMongoRepository)
}
