import { AddSurveyModel, SurveyAnswerModel, HttpRequest, Validator, badRequest, AddSurvey, serverError, noContent } from './add-survey-protocol'
import { AddSurveyController } from './add-survey-controller'
import MockDate from 'mockdate'

const makeFakeAnswer = (): SurveyAnswerModel => ({
  image: 'any_image',
  answer: 'any_answer'
})

const makeFakeAddSurvey = (): AddSurveyModel => ({
  question: 'any_question',
  answers: [makeFakeAnswer()],
  date: new Date()
})

const makeFakeHttpRequest = (): HttpRequest => ({
  body: makeFakeAddSurvey()
})

const makeAddSurveyStub = (): AddSurvey => {
  class AddSurveyStub implements AddSurvey {
    async add (data: AddSurveyModel): Promise<void> {
      return await new Promise(resolve => resolve())
    }
  }
  return new AddSurveyStub()
}

const makeValidatorStub = (): Validator => {
  class ValidatorStub implements Validator {
    validate (input: any): Error | null {
      return null
    }
  }
  return new ValidatorStub()
}

interface SutTypes {
  sut: AddSurveyController
  validatorStub: Validator
  addSurveyStub: AddSurvey
}

const makeSut = (): SutTypes => {
  const validatorStub = makeValidatorStub()
  const addSurveyStub = makeAddSurveyStub()
  const sut = new AddSurveyController(validatorStub, addSurveyStub)
  return {
    sut,
    validatorStub,
    addSurveyStub
  }
}

describe('AddSurvey Controller', () => {
  beforeAll(() => MockDate.set(new Date()))
  afterAll(() => MockDate.reset())

  test('should call Validation with correct values', async () => {
    const { sut, validatorStub } = makeSut()
    const validateSpy = jest.spyOn(validatorStub, 'validate')
    await sut.handle(makeFakeHttpRequest())
    expect(validateSpy).toHaveBeenCalledWith(makeFakeAddSurvey())
  })

  test('should return 400 if Validation fails', async () => {
    const { sut, validatorStub } = makeSut()
    jest.spyOn(validatorStub, 'validate').mockReturnValueOnce(new Error())
    const httpResponse = await sut.handle(makeFakeHttpRequest())
    expect(httpResponse).toEqual(badRequest(new Error()))
  })

  test('should call AddSurvey with correct values', async () => {
    const { sut, addSurveyStub } = makeSut()
    const addSpy = jest.spyOn(addSurveyStub, 'add')
    await sut.handle(makeFakeHttpRequest())
    expect(addSpy).toHaveBeenCalledWith(makeFakeAddSurvey())
  })

  test('should return 500 if AddSurvey throws', async () => {
    const { sut, addSurveyStub } = makeSut()
    jest.spyOn(addSurveyStub, 'add').mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())))
    const httpResponse = await sut.handle(makeFakeHttpRequest())
    expect(httpResponse).toEqual(serverError(new Error()))
  })

  test('should return 204 on success', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle(makeFakeHttpRequest())
    expect(httpResponse).toEqual(noContent())
  })
})
