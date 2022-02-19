import { CompareFieldsValidator, EmailValidation, RequiredFieldsValidator, ValidatorComposite } from '../../../presentation/helpers/validator'
import { Validator } from '../../../presentation/protocols/validator'
import { EmailValidatorAdapter } from '../../adapters/validators/email-validator-adapter'

export const makeSignupValidator = (): ValidatorComposite => {
  const validations: Validator[] = []
  for (const validator of ['name', 'email', 'password', 'passwordConfirmation']) {
    validations.push(new RequiredFieldsValidator(validator))
  }
  validations.push(new CompareFieldsValidator('password', 'passwordConfirmation'))
  validations.push(new EmailValidation('email', new EmailValidatorAdapter()))
  return new ValidatorComposite(validations)
}
