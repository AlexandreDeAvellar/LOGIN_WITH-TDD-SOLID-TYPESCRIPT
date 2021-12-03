import { makeSignupValidator } from './signup-validator'
import { ValidatorComposite } from '../../presentation/helpers/validator/validator-composite'
import { RequiredFieldsValidator } from '../../presentation/helpers/validator/required-fields-validator'
import { Validator } from '../../presentation/helpers/validator/validator'

jest.mock('../../presentation/helpers/validator/validator-composite')

describe('SignupValidator Factory', () => {
  it('Should call ValidationComposite with all validations', () => {
    makeSignupValidator()
    const validations: Validator[] = []
    for (const validator of ['name', 'email', 'password', 'passwordConfirmation']) {
      validations.push(new RequiredFieldsValidator(validator))
    }
    expect(ValidatorComposite).toHaveBeenCalledWith(validations)
  })
})
