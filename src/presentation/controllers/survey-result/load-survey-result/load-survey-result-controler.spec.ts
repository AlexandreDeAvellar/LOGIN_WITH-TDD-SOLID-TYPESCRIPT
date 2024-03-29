import { LoadSurveyResultController } from './load-survey-result-controler'
import { LoadSurveyResult, serverError, forbidden, InvalidParamError, LoadSurveyById, ok } from './load-survey-result-controler-protocols'
import { HttpRequest } from '../../../protocols'
import { makeLoadSurveyResultStub } from '../../../../data/usecase/load-survey-result/db-load-survey-result-mocks'
import { makeLoadSurveyByIdRepositoryStub } from '../../../../data/usecase/load-survey-by-id/db-load-survey-by-id-mocks'
import { makeFakeSurveyResultModelRepo } from '../../../../data/usecase/save-survey-result/db-save-survey-result-mocks'
import MockDate from 'mockdate'

const makeFakeHttpRequest = (): HttpRequest => ({ params: { surveyId: 'any_surveyId' } })

interface SutTypes {
  sut: LoadSurveyResultController
  loadSurveyByIdStub: LoadSurveyById
  loadSurveyResultRepositoryStub: LoadSurveyResult
}

const makeSut = (): SutTypes => {
  const loadSurveyByIdStub = makeLoadSurveyByIdRepositoryStub()
  const loadSurveyResultRepositoryStub = makeLoadSurveyResultStub()
  const sut = new LoadSurveyResultController(loadSurveyByIdStub, loadSurveyResultRepositoryStub)
  return { sut, loadSurveyByIdStub, loadSurveyResultRepositoryStub }
}

describe('LoadSurveyResultController', () => {
  beforeAll(() => MockDate.set(new Date()))
  afterAll(() => MockDate.reset())

  test('should call LoadSurveyById with correct values', async () => {
    const { sut, loadSurveyByIdStub } = makeSut()
    const loadByIdSpy = jest.spyOn(loadSurveyByIdStub, 'loadById')
    await sut.handle(makeFakeHttpRequest())
    expect(loadByIdSpy).toHaveBeenCalledWith('any_surveyId')
  })

  test('should return 403 if LoadSurveyById returns null', async () => {
    const { sut, loadSurveyByIdStub } = makeSut()
    jest.spyOn(loadSurveyByIdStub, 'loadById').mockReturnValueOnce(Promise.resolve(null))
    const httpResponse = await sut.handle(makeFakeHttpRequest())
    expect(httpResponse).toEqual(forbidden(new InvalidParamError('surveyId')))
  })

  test('should return 500 if LoadSurveyResultRepository throws', async () => {
    const { sut, loadSurveyByIdStub } = makeSut()
    jest.spyOn(loadSurveyByIdStub, 'loadById').mockReturnValueOnce(Promise.reject(new Error()))
    const httpResponse = await sut.handle(makeFakeHttpRequest())
    expect(httpResponse).toEqual(serverError(new Error()))
  })

  test('should call LoadSurveyResultRepository with correct values', async () => {
    const { sut, loadSurveyResultRepositoryStub } = makeSut()
    const loadSpy = jest.spyOn(loadSurveyResultRepositoryStub, 'load')
    await sut.handle(makeFakeHttpRequest())
    expect(loadSpy).toHaveBeenCalledWith('any_surveyId')
  })

  test('should return 500 if LoadSurveyResultRepository throws', async () => {
    const { sut, loadSurveyResultRepositoryStub } = makeSut()
    jest.spyOn(loadSurveyResultRepositoryStub, 'load').mockReturnValueOnce(Promise.reject(new Error()))
    const httpResponse = await sut.handle(makeFakeHttpRequest())
    expect(httpResponse).toEqual(serverError(new Error()))
  })

  test('should return 200 on success', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle(makeFakeHttpRequest())
    expect(httpResponse).toEqual(ok(makeFakeSurveyResultModelRepo()))
  })
})
