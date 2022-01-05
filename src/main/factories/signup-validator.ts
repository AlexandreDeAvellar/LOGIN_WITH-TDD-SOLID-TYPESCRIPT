// import { MissingParamError } from '../../presentation/errors'
import { CompareFieldsValidator, RequiredFieldsValidator, ValidatorComposite } from '../../presentation/helpers/validator'
import { Validator } from '../../presentation/helpers/validator/validator'

export const makeSignupValidator = (): ValidatorComposite => {
  const validations: Validator[] = []
  for (const validator of ['name', 'email', 'password', 'passwordConfirmation']) {
    validations.push(new RequiredFieldsValidator(validator))
  }
  validations.push(new CompareFieldsValidator('password', 'passwordConfirmation'))
  return new ValidatorComposite(validations)
}
