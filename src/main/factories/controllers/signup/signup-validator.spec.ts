import { makeSignupValidator } from './signup-validator'
import { Validator } from '../../../../presentation/protocols'
import { EmailValidator } from '../../../../validation/protocols/email-validator'
import { CompareFieldsValidator, EmailValidation, RequiredFieldsValidator, ValidatorComposite } from '../../../../validation/validator'

jest.mock('../../../../validation/validator/validator-composite')

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
