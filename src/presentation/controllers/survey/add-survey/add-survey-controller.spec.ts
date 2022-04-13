import { AddSurvey, Answer, HttpRequest, Validator } from './add-survey-protocol'
import { AddSurveyController } from './add-survey-controller'

const makeFakeAnswer = (): Answer => ({
  image: 'any_image',
  answer: 'any_answer'
})

const makeFakeAddSurvey = (): AddSurvey => ({
  question: 'any_question',
  answers: [makeFakeAnswer()]
})

const makeFakeHttpRequest = (): HttpRequest => ({
  body: makeFakeAddSurvey()
})

interface SutTypes {
  sut: AddSurveyController
  validatorStub: Validator
}

const makeValidatorStub = (): Validator => {
  class ValidatorStub implements Validator {
    validate (input: any): Error | null {
      return null
    }
  }
  return new ValidatorStub()
}

const makeSut = (): SutTypes => {
  const validatorStub = makeValidatorStub()
  const sut = new AddSurveyController(validatorStub)
  return {
    sut,
    validatorStub
  }
}

describe('AddSurvey Controller', () => {
  test('should call Validation with correct values', async () => {
    const { sut, validatorStub } = makeSut()
    const validateSpy = jest.spyOn(validatorStub, 'validate')
    await sut.handle(makeFakeHttpRequest())
    expect(validateSpy).toHaveBeenCalledWith(makeFakeAddSurvey())
  })
})
