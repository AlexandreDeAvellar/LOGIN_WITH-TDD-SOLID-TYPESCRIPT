import { EmailValidatorAdapter } from './email-validator'
import validator from 'validator'

jest.mock('validator', () => ({
  isEmail: (): boolean => {
    return true
  }
}))

describe('EmailValidator Adapter', () => {
  it('Should return false if validator returns false', () => {
    const sut = new EmailValidatorAdapter()
    const email = 'invalid_email@mail.com'
    jest.spyOn(validator, 'isEmail').mockReturnValueOnce(false)
    const isValid = sut.isValid(email)
    expect(isValid).toBe(false)
  })

  it('Should return true if validator returns true', () => {
    const sut = new EmailValidatorAdapter()
    const email = 'valid_email@mail.com'
    const isValid = sut.isValid(email)
    expect(isValid).toBe(true)
  })

  it('Should call validator with correct email', () => {
    const sut = new EmailValidatorAdapter()
    const email = 'any_email@mail.com'
    const isEmailSpy = jest.spyOn(validator, 'isEmail')
    sut.isValid(email)
    expect(isEmailSpy).toHaveBeenCalledWith('any_email@mail.com')
  })
})
