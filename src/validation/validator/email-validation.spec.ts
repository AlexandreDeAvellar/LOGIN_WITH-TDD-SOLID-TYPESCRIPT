import { EmailValidation } from '.'
import { EmailValidator } from '../protocols/email-validator'
import { InvalidParamError } from '../../presentation/errors'

interface SutType {
  sut: EmailValidation
  emailValidatorStub: EmailValidator
}

const makeEmailValidatorStub = (): EmailValidator => {
  class EmailValidatorStub implements EmailValidator {
    isValid (email: string): Boolean {
      return true
    }
  }
  return new EmailValidatorStub()
}

const makeSut = (): SutType => {
  const emailValidatorStub = makeEmailValidatorStub()
  const sut = new EmailValidation('email', emailValidatorStub)
  return {
    sut,
    emailValidatorStub
  }
}

const makeHttpRequest = {
  email: 'any_email@mail.com'
}

describe('Email Validation', () => {
  it('should return an error if EmailValidator returns false', () => {
    const { sut, emailValidatorStub } = makeSut()
    jest.spyOn(emailValidatorStub, 'isValid').mockReturnValueOnce(false)
    const error = sut.validate(makeHttpRequest.email)
    expect(error).toEqual(new InvalidParamError('email'))
  })

  it('should throw if EmailValidator throws', () => {
    const { sut, emailValidatorStub } = makeSut()
    jest.spyOn(emailValidatorStub, 'isValid').mockImplementationOnce(() => {
      throw new Error()
    })
    expect(sut.validate).toThrow()
  })

  it('should call EmailValidator with correct email', () => {
    const { sut, emailValidatorStub } = makeSut()
    const isValidSpy = jest.spyOn(emailValidatorStub, 'isValid')
    sut.validate(makeHttpRequest)
    expect(isValidSpy).toBeCalledWith(makeHttpRequest.email)
  })

  it('should return null if correct email is provided', () => {
    const { sut } = makeSut()
    const isValid = sut.validate(makeHttpRequest)
    expect(isValid).toBe(null)
  })
})
