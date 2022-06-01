import { LoadSurveyByIdRepository, SurveyModel } from './load-survey-by-id-protocols'
import { DbLoadSurveyById } from './db-load-survey-by-id'
import MockDate from 'mockdate'

const makeFakeSurveysModel = (): SurveyModel => ({
  id: 'valid_id', question: 'any_question', answers: [{ answer: 'any_answer', image: 'any_image' }], date: new Date()
})

const makeLoadSurveyByIdRepositoryStub = (): LoadSurveyByIdRepository => {
  class LoadSurveyByIdRepositoryStub implements LoadSurveyByIdRepository {
    async loadById (): Promise<SurveyModel> {
      return await new Promise(resolve => resolve(makeFakeSurveysModel()))
    }
  }
  return new LoadSurveyByIdRepositoryStub()
}

interface SutTypes {
  sut: DbLoadSurveyById
  loadSurveyByIdRepositoryStub: LoadSurveyByIdRepository
}

const makeSut = (): SutTypes => {
  const loadSurveyByIdRepositoryStub = makeLoadSurveyByIdRepositoryStub()
  const sut = new DbLoadSurveyById(loadSurveyByIdRepositoryStub)
  return { sut, loadSurveyByIdRepositoryStub }
}

describe('DbLoadSurveyById', () => {
  beforeEach(() => MockDate.set(new Date()))
  afterAll(() => MockDate.reset())
  test('should calls LoadSurveyByIdRepository with correct value', async () => {
    const { sut, loadSurveyByIdRepositoryStub } = makeSut()
    const loadByIdSpy = jest.spyOn(loadSurveyByIdRepositoryStub, 'loadById')
    await sut.loadById('any_id')
    expect(loadByIdSpy).toHaveBeenCalledWith('any_id')
  })
})
