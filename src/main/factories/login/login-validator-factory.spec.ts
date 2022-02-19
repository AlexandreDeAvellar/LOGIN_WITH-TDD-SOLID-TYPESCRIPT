import { EmailValidation, RequiredFieldsValidator, Validator, ValidatorComposite } from '../../../presentation/helpers/validator'
import { EmailValidator } from '../../../presentation/protocols/email-validator'
import { makeLoginValidator } from './login-validator-factory'

jest.mock('../../../presentation/helpers/validator/validator-composite')

const makeEmailValidator = (): EmailValidator => {
  class EmailValidatorStub implements EmailValidator {
    isValid (email: string): Boolean {
      return true
    };
  }
  return new EmailValidatorStub()
}

describe('LoginValidator Factory', () => {
  test('should call ValidationComposite with all validations', () => {
    makeLoginValidator()
    const validations: Validator[] = []
    for (const validator of ['email', 'password']) {
      validations.push(new RequiredFieldsValidator(validator))
    }
    validations.push(new EmailValidation('email', makeEmailValidator()))
    expect(ValidatorComposite).toHaveBeenCalledWith(validations)
  })
})
