import { LoadSurveyResultController } from './load-survey-result-controler'
import { LoadSurveyResultRepository } from './load-survey-result-controler-protocols'
import { HttpRequest } from '../../../protocols'
import { makeLoadSurveyResultRepositoryStub } from '../../../../data/usecase/load-survey-result/db-load-survey-result-mocks'

const makeFakeHttpRequest = (): HttpRequest => ({ params: { surveyId: 'any_surveyId' } })

interface SutTypes {
  sut: LoadSurveyResultController
  loadSurveyResultRepositoryStub: LoadSurveyResultRepository
}

const makeSut = (): SutTypes => {
  const loadSurveyResultRepositoryStub = makeLoadSurveyResultRepositoryStub()
  const sut = new LoadSurveyResultController(loadSurveyResultRepositoryStub)
  return { sut, loadSurveyResultRepositoryStub }
}

describe('LoadSurveyResultController', () => {
  test('should call LoadSurveyResultRepository with correct values', async () => {
    const { sut, loadSurveyResultRepositoryStub } = makeSut()
    const loadBySurveyIdSpy = jest.spyOn(loadSurveyResultRepositoryStub, 'loadBySurveyId')
    await sut.handle(makeFakeHttpRequest())
    expect(loadBySurveyIdSpy).toHaveBeenCalledWith('any_surveyId')
  })
})
