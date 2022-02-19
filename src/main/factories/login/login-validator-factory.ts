import { EmailValidation, RequiredFieldsValidator, Validator, ValidatorComposite } from '../../../presentation/helpers/validator'
import { EmailValidatorAdapter } from '../../adapters/validators/email-validator-adapter'

export const makeLoginValidator = (): ValidatorComposite => {
  const validations: Validator[] = []
  for (const validator of ['email', 'password']) {
    validations.push(new RequiredFieldsValidator(validator))
  }
  validations.push(new EmailValidation('email', new EmailValidatorAdapter()))
  return new ValidatorComposite(validations)
}
