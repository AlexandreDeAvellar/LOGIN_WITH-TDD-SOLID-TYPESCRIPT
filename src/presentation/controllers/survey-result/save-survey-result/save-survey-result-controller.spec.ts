import { HttpRequest, LoadSurveyByIdRepository, SurveyModelRepo } from './save-survey-result-controller-protocols'
import { SaveSurveyResultController } from './save-survey-result-controller'

const makeFakeHttpRequest = (): HttpRequest => ({
  params: { id: 'any_survey_id' }
})

const makeFakeSurveyModelRepo = (): SurveyModelRepo => ({
  answers: [{ answer: 'any_answer', image: 'any_image' }], date: new Date(), id: 'any_id', question: 'any_question'
})

const makeLoadSurveyByIdRepositoryStub = (): LoadSurveyByIdRepository => {
  class LoadSurveyByIdRepositoryStub implements LoadSurveyByIdRepository {
    async loadById (id: string): Promise<SurveyModelRepo> {
      return await new Promise(resolve => resolve(makeFakeSurveyModelRepo()))
    }
  }
  return new LoadSurveyByIdRepositoryStub()
}

interface SutTypes {
  sut: SaveSurveyResultController
  loadSurveyByIdRepositoryStub: LoadSurveyByIdRepository
}

const makeSut = (): SutTypes => {
  const loadSurveyByIdRepositoryStub = makeLoadSurveyByIdRepositoryStub()
  const sut = new SaveSurveyResultController(loadSurveyByIdRepositoryStub)
  return { sut, loadSurveyByIdRepositoryStub }
}

describe('SaveSurveyResultController', () => {
  test('should call LoadSurveyByIdRepository with correct values', async () => {
    const { sut, loadSurveyByIdRepositoryStub } = makeSut()
    const loadByIdSpy = jest.spyOn(loadSurveyByIdRepositoryStub, 'loadById')
    await sut.handle(makeFakeHttpRequest())
    expect(loadByIdSpy).toHaveBeenCalledWith(makeFakeHttpRequest().params.id)
  })
})
