import { EmailValidation, RequiredFieldsValidator, ValidatorComposite } from '../../../../validation/validator'
import { EmailValidator } from '../../../../validation/protocols/email-validator'
import { makeLoginValidator } from './login-validator-factory'
import { Validator } from '../../../../presentation/protocols'

jest.mock('../../../../validation/validator/validator-composite')

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
