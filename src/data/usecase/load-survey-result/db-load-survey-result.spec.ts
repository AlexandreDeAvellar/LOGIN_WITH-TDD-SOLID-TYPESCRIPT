import { DbLoadSurveyResult } from './db-load-survey-result'
import { LoadSurveyResultRepository } from './db-load-survey-result-protocols'
import { makeLoadSurveyResultRepositoryStub } from './db-load-survey-result-mocks'

const surveyId = 'any_surveyId'

interface SutTypes {
  sut: DbLoadSurveyResult
  loadSurveyResultRepositoryStub: LoadSurveyResultRepository
}

const makeSut = (): SutTypes => {
  const loadSurveyResultRepositoryStub = makeLoadSurveyResultRepositoryStub()
  const sut = new DbLoadSurveyResult(loadSurveyResultRepositoryStub)
  return { sut, loadSurveyResultRepositoryStub }
}

describe('DbLoadSurveyResult', () => {
  test('should call LoadSurveyResultRepository with correct values', async () => {
    const { sut, loadSurveyResultRepositoryStub } = makeSut()
    const loadSpy = jest.spyOn(loadSurveyResultRepositoryStub, 'load')
    await sut.load(surveyId)
    expect(loadSpy).toHaveBeenCalledWith(surveyId)
  })
})
