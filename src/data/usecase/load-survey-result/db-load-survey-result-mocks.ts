import { LoadSurveyResultRepository, SurveyResultModel, LoadSurveyByIdRepository } from './db-load-survey-result-protocols'
import { makeFakeSurveyResultModelRepo } from '../save-survey-result/db-save-survey-result-mocks'

export const makeLoadSurveyResultRepositoryStub = (): LoadSurveyResultRepository => ({
  loadBySurveyId: async (): Promise<SurveyResultModel> => await Promise.resolve(makeFakeSurveyResultModelRepo())
})

export const makeLoadSurveyByIdRepositoryStub = (): LoadSurveyByIdRepository => ({
  loadById: async () => await Promise.resolve({ answers: [{ answer: 'any_answer1' }, { answer: 'any_answer2' }], date: new Date(), id: 'any_surveyID', question: 'any_question' })
})
