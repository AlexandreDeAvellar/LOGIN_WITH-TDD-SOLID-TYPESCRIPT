import { EmailValidatorAdapter } from './email-validator'

describe('EmailValidator Adapter', () => {
  it('Should return false if validator returns false', () => {
    const sut = new EmailValidatorAdapter()
    const email = 'invalid_email'
    const isValid = sut.isValid(email)
    expect(isValid).toBe(false)
  })
})
