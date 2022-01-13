import { makeSignupValidator } from './signup-validator'
import { ValidatorComposite } from '../../../presentation/helpers/validator/validator-composite'
import { RequiredFieldsValidator, CompareFieldsValidator, EmailValidation } from '../../../presentation/helpers/validator'
import { Validator } from '../../../presentation/helpers/validator/validator'
import { EmailValidator } from '../../../presentation/protocols/email-validator'

jest.mock('../../../presentation/helpers/validator/validator-composite')

const makeEmailValidator = (): EmailValidator => {
  class EmailValidatorStub implements EmailValidator {
    isValid (email: string): Boolean {
      return true
    };
  }
  return new EmailValidatorStub()
}

describe('SignupValidator Factory', () => {
  it('Should call ValidationComposite with all validations', () => {
    makeSignupValidator()
    const validations: Validator[] = []
    for (const validator of ['name', 'email', 'password', 'passwordConfirmation']) {
      validations.push(new RequiredFieldsValidator(validator))
    }
    validations.push(new CompareFieldsValidator('password', 'passwordConfirmation'))
    validations.push(new EmailValidation('email', makeEmailValidator()))
    expect(ValidatorComposite).toHaveBeenCalledWith(validations)
  })
})
