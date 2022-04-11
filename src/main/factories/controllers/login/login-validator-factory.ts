import { Validator } from '../../../../presentation/protocols'
import { EmailValidation, RequiredFieldsValidator, ValidatorComposite } from '../../../../validation/validator'
import { EmailValidatorAdapter } from '../../../../infra/validators/email-validator-adapter'

export const makeLoginValidator = (): ValidatorComposite => {
  const validations: Validator[] = []
  for (const validator of ['email', 'password']) {
    validations.push(new RequiredFieldsValidator(validator))
  }
  validations.push(new EmailValidation('email', new EmailValidatorAdapter()))
  return new ValidatorComposite(validations)
}
