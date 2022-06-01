import { DbSaveSurveyResult } from './db-save-survey-result'
import { SaveSurveyResultRepository, SurveyResultDataRepo, SurveyResultModelRepo } from './save-survey-result-protocols'
import MockDate from 'mockdate'

const makeFakeSurveyResultDataRepo = (): SurveyResultDataRepo => (
  { accountId: 'any_accountID', surveyId: 'any_surveyID', date: new Date(), answer: 'any_answer' }
)

const makeFakeSurveyResultModelRepo = (): SurveyResultModelRepo => (
  { id: 'any_id', accountId: 'any_accountID', surveyId: 'any_surveyID', date: new Date(), answer: 'any_answer' }
)

const makeSaveSurveyResultRepositoryStub = (): SaveSurveyResultRepository => {
  class SaveSurveyResultRepositoryStub implements SaveSurveyResultRepository {
    async save (data: SurveyResultDataRepo): Promise<SurveyResultModelRepo> {
      return await new Promise(resolve => resolve(makeFakeSurveyResultModelRepo()))
    }
  }
  return new SaveSurveyResultRepositoryStub()
}

interface SutTypes {
  sut: DbSaveSurveyResult
  saveSurveyResultRepositoryStub: SaveSurveyResultRepository
}

const makeSut = (): SutTypes => {
  const saveSurveyResultRepositoryStub = makeSaveSurveyResultRepositoryStub()
  const sut = new DbSaveSurveyResult(saveSurveyResultRepositoryStub)
  return { sut, saveSurveyResultRepositoryStub }
}

describe('DbSaveSurveyResult', () => {
  beforeAll(() => MockDate.set(new Date()))
  afterAll(() => MockDate.reset())

  test('should call SaveSurveyResultRepository with correct values', async () => {
    const { sut, saveSurveyResultRepositoryStub } = makeSut()
    const saveSpy = jest.spyOn(saveSurveyResultRepositoryStub, 'save')
    await sut.save(makeFakeSurveyResultDataRepo())
    expect(saveSpy).toHaveBeenCalledWith(makeFakeSurveyResultDataRepo())
  })
})
