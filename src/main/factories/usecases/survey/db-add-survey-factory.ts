import { DbAddSurvey } from '../../../../data/usecase/add-survey/db-add-survey'
import { AddSurvey } from '../../../../domain/usecases/add-survey'
import { SurveyMongoRepository } from '../../../../infra/db/mongodb/survey/survey-mongo-repository'

export const makeAddSurvey = (): AddSurvey => {
  const addSurveyRepository = new SurveyMongoRepository()
  return new DbAddSurvey(addSurveyRepository)
}
