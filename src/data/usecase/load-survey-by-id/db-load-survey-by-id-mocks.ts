import { LoadSurveyByIdRepository, SurveyModel } from './db-load-survey-by-id-protocols'

export const makeFakeSurveysModel = (): SurveyModel => ({
  id: 'valid_id', question: 'any_question', answers: [{ answer: 'any_answer', image: 'any_image' }], date: new Date()
})

export const makeLoadSurveyByIdRepositoryStub = (): LoadSurveyByIdRepository => {
  class LoadSurveyByIdRepositoryStub implements LoadSurveyByIdRepository {
    async loadById (): Promise<SurveyModel | null> {
      return await new Promise(resolve => resolve(makeFakeSurveysModel()))
    }
  }
  return new LoadSurveyByIdRepositoryStub()
}
