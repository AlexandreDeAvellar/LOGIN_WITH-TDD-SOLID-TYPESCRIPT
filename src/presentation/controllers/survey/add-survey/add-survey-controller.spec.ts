import { AddSurveyModel, Answer, HttpRequest, Validator, badRequest, AddSurvey } from './add-survey-protocol'
import { AddSurveyController } from './add-survey-controller'

const makeFakeAnswer = (): Answer => ({
  image: 'any_image',
  answer: 'any_answer'
})

const makeFakeAddSurvey = (): AddSurveyModel => ({
  question: 'any_question',
  answers: [makeFakeAnswer()]
})

const makeFakeHttpRequest = (): HttpRequest => ({
  body: makeFakeAddSurvey()
})

const makeAddSurveyStub = (): AddSurvey => {
  class AddSurveyStub implements AddSurvey {
    async add (data: AddSurveyModel): Promise<null> {
      return await new Promise(resolve => resolve(null))
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
})