import { LoadSurveyResultController } from './load-survey-result-controler'
import { LoadSurveyResultRepository, serverError, forbidden, InvalidParamError } from './load-survey-result-controler-protocols'
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

  test('should return 403 if LoadSurveyById returns null', async () => {
    const { sut, loadSurveyResultRepositoryStub } = makeSut()
    jest.spyOn(loadSurveyResultRepositoryStub, 'loadBySurveyId').mockReturnValueOnce(Promise.resolve(null))
    const httpResponse = await sut.handle(makeFakeHttpRequest())
    expect(httpResponse).toEqual(forbidden(new InvalidParamError('surveyId')))
  })

  test('should return 500 if LoadSurveyResultRepository throws', async () => {
    const { sut, loadSurveyResultRepositoryStub } = makeSut()
    jest.spyOn(loadSurveyResultRepositoryStub, 'loadBySurveyId').mockReturnValueOnce(Promise.reject(new Error()))
    const httpResponse = await sut.handle(makeFakeHttpRequest())
    expect(httpResponse).toEqual(serverError(new Error()))
  })
})
