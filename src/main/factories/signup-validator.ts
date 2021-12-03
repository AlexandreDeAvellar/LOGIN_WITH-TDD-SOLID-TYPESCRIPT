// import { MissingParamError } from '../../presentation/errors'
import { RequiredFieldsValidator } from '../../presentation/helpers/validator/required-fields-validator'
import { Validator } from '../../presentation/helpers/validator/validator'
import { ValidatorComposite } from '../../presentation/helpers/validator/validator-composite'

export const makeSignupValidator = (): ValidatorComposite => {
  const validations: Validator[] = []
  for (const validator of ['name', 'email', 'password', 'passwordConfirmation']) {
    validations.push(new RequiredFieldsValidator(validator))
  }
  return new ValidatorComposite(validations)
}
