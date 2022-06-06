import { forbidden, HttpRequest, InvalidParamError, LoadSurveyById, SurveyModel, serverError, SurveyResultData, SaveSurveyResult, SurveyResultModel } from './save-survey-result-controller-protocols'
import { SaveSurveyResultController } from './save-survey-result-controller'
import MockDate from 'mockdate'

const makeFakeHttpRequest = (): HttpRequest => ({
  params: { id: 'any_survey_id' },
  body: { answer: 'any_answer' },
  accountId: 'any_account_id'
})

const makeFakeSurveyModel = (): SurveyModel => ({
  answers: [{ answer: 'any_answer', image: 'any_image' }], date: new Date(), id: 'any_id', question: 'any_question'
})

const makeFakeSurveyResultData = (): SurveyResultData => ({
  accountId: 'any_account_id', answer: 'any_answer', date: new Date(), surveyId: 'any_survey_id'
})

const makeLoadSurveyByIdStub = (): LoadSurveyById => {
  class LoadSurveyByIdStub implements LoadSurveyById {
    async loadById (id: string): Promise<SurveyModel | null> {
      return await new Promise(resolve => resolve(makeFakeSurveyModel()))
    }
  }
  return new LoadSurveyByIdStub()
}

const makeSaveSurveyResultStub = (): SaveSurveyResult => {
  class SaveSurveyResultStub implements SaveSurveyResult {
    async save (data: SurveyResultData): Promise<SurveyResultModel> {
      return await new Promise(resolve => resolve({ ...makeFakeSurveyResultData(), id: 'valid_id' }))
    }
  }
  return new SaveSurveyResultStub()
}

interface SutTypes {
  sut: SaveSurveyResultController
  loadSurveyByIdStub: LoadSurveyById
  saveSurveyResultStub: SaveSurveyResult
}

const makeSut = (): SutTypes => {
  const loadSurveyByIdStub = makeLoadSurveyByIdStub()
  const saveSurveyResultStub = makeSaveSurveyResultStub()
  const sut = new SaveSurveyResultController(loadSurveyByIdStub, saveSurveyResultStub)
  return { sut, loadSurveyByIdStub, saveSurveyResultStub }
}

describe('SaveSurveyResultController', () => {
  beforeAll(() => MockDate.set(new Date()))
  afterAll(() => MockDate.reset())

  test('should call LoadSurveyById with correct values', async () => {
    const { sut, loadSurveyByIdStub } = makeSut()
    const loadByIdSpy = jest.spyOn(loadSurveyByIdStub, 'loadById')
    await sut.handle(makeFakeHttpRequest())
    expect(loadByIdSpy).toHaveBeenCalledWith(makeFakeHttpRequest().params.id)
  })

  test('should return 403 if LoadSurveyById returns null', async () => {
    const { sut, loadSurveyByIdStub } = makeSut()
    jest.spyOn(loadSurveyByIdStub, 'loadById').mockReturnValueOnce(new Promise(resolve => resolve(null)))
    const httpResponse = await sut.handle(makeFakeHttpRequest())
    expect(httpResponse).toEqual(forbidden(new InvalidParamError('surveyId')))
  })

  test('should return 500 if LoadSurveyById throws', async () => {
    const { sut, loadSurveyByIdStub } = makeSut()
    jest.spyOn(loadSurveyByIdStub, 'loadById').mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())))
    const httpResponse = await sut.handle(makeFakeHttpRequest())
    expect(httpResponse).toEqual(serverError(new Error()))
  })

  test('should return 403 if invalid answer is provided', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle({ ...makeFakeHttpRequest(), body: { answer: 'wrong_answer' } })
    expect(httpResponse).toEqual(forbidden(new InvalidParamError('answer')))
  })

  test('should return 403 if no accounId are found', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle({ ...makeFakeHttpRequest(), accountId: '' })
    expect(httpResponse).toEqual(forbidden(new InvalidParamError('accoundId')))
  })

  test('should call SaveSurveyResult with correct values', async () => {
    const { sut, saveSurveyResultStub } = makeSut()
    const { accountId, body: { answer }, params: { id } } = makeFakeHttpRequest()
    const saveSpy = jest.spyOn(saveSurveyResultStub, 'save')
    await sut.handle(makeFakeHttpRequest())
    expect(saveSpy).toHaveBeenCalledWith({ accountId, answer, surveyId: id, date: new Date() })
  })

  test('should return 500 if SaveSurveyResult throws', async () => {
    const { sut, saveSurveyResultStub } = makeSut()
    jest.spyOn(saveSurveyResultStub, 'save').mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())))
    const hettpResponse = await sut.handle(makeFakeHttpRequest())
    expect(hettpResponse).toEqual(serverError(new Error()))
  })
})
