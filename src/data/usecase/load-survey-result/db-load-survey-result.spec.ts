import { DbLoadSurveyResult } from './db-load-survey-result'
import { LoadSurveyResultRepository, LoadSurveyByIdRepository } from './db-load-survey-result-protocols'
import { makeLoadSurveyResultRepositoryStub, makeLoadSurveyByIdRepositoryStub } from './db-load-survey-result-mocks'
import { makeFakeSurveyResultModelRepo } from '../save-survey-result/db-save-survey-result-mocks'

const surveyId = 'any_surveyId'

interface SutTypes {
  sut: DbLoadSurveyResult
  loadSurveyResultRepositoryStub: LoadSurveyResultRepository
  loadSurveyByIdRepositoryStub: LoadSurveyByIdRepository
}

const makeSut = (): SutTypes => {
  const loadSurveyResultRepositoryStub = makeLoadSurveyResultRepositoryStub()
  const loadSurveyByIdRepositoryStub = makeLoadSurveyByIdRepositoryStub()
  const sut = new DbLoadSurveyResult(loadSurveyResultRepositoryStub, loadSurveyByIdRepositoryStub)
  return { sut, loadSurveyResultRepositoryStub, loadSurveyByIdRepositoryStub }
}

describe('DbLoadSurveyResult', () => {
  describe('load', () => {
    test('should call LoadSurveyResultRepository with correct values', async () => {
      const { sut, loadSurveyResultRepositoryStub } = makeSut()
      const loadSpy = jest.spyOn(loadSurveyResultRepositoryStub, 'loadBySurveyId')
      await sut.load(surveyId)
      expect(loadSpy).toHaveBeenCalledWith(surveyId)
    })

    test('should throw if LoadSurveyResultRepository throws', async () => {
      const { sut, loadSurveyResultRepositoryStub } = makeSut()
      jest.spyOn(loadSurveyResultRepositoryStub, 'loadBySurveyId').mockReturnValueOnce(Promise.reject(new Error()))
      const promise = sut.load(surveyId)
      await expect(promise).rejects.toThrow()
    })

    test('should return SurveyResultModel on success', async () => {
      const { sut } = makeSut()
      const surveyResult = await sut.load(surveyId)
      expect(surveyResult).toEqual(makeFakeSurveyResultModelRepo())
    })
  })

  describe('load', () => {
    test('should call LoadSurveyByIdRepository if LoadSurveyResultRepository returns null', async () => {
      const { sut, loadSurveyResultRepositoryStub, loadSurveyByIdRepositoryStub } = makeSut()
      jest.spyOn(loadSurveyResultRepositoryStub, 'loadBySurveyId').mockReturnValueOnce(Promise.resolve(null))
      const loadByIdSpy = jest.spyOn(loadSurveyByIdRepositoryStub, 'loadById')
      await sut.load(surveyId)
      expect(loadByIdSpy).toHaveBeenCalledWith(surveyId)
    })

    test('should return all answers with zero if LoadSurveyResultRepository returns null', async () => {
      const { sut, loadSurveyResultRepositoryStub } = makeSut()
      jest.spyOn(loadSurveyResultRepositoryStub, 'loadBySurveyId').mockReturnValueOnce(Promise.resolve(null))
      const surveyResult = await sut.load(surveyId)
      expect(surveyResult.answers[0].count).toBe(0)
      expect(surveyResult.answers[0].percent).toBe(0)
    })
  })
})
