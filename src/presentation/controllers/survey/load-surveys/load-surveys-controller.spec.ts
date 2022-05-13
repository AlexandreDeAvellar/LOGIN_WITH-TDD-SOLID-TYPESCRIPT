import { LoadSurveys, SurveyAnswerModel, SurveyModel } from './load-surveys-controller-protocols'
import { LoadSurveysController } from './load-surveys-controller'

const makeFakeSurveyAnswerModel = (): SurveyAnswerModel => ({
  answer: 'any_aswer', image: 'any_image'
})

const makeFakeSurveyModel = (): SurveyModel => ({
  id: 'valid_id',
  question: 'any_question',
  answers: [makeFakeSurveyAnswerModel()],
  date: new Date()
})

const makeLoadSurveyStub = (): LoadSurveys => {
  class LoadSurveyStub implements LoadSurveys {
    async load (): Promise<SurveyModel[]> {
      return await new Promise(resolve => resolve([makeFakeSurveyModel()]))
    }
  }
  return new LoadSurveyStub()
}

interface SutTyes {
  sut: LoadSurveysController
  loadSurveysStub: LoadSurveys
}

const makeSut = (): SutTyes => {
  const loadSurveysStub = makeLoadSurveyStub()
  const sut = new LoadSurveysController(loadSurveysStub)
  return { sut, loadSurveysStub }
}

describe('LoadSurveysController', () => {
  test('should call LoadSurveys', async () => {
    const { sut, loadSurveysStub } = makeSut()
    const loadSpy = jest.spyOn(loadSurveysStub, 'load')
    await sut.handle({})
    expect(loadSpy).toHaveBeenCalled()
  })
})
