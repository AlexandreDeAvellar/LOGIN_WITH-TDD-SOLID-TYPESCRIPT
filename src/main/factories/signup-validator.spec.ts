import { makeSignupValidator } from './signup-validator'
import { ValidatorComposite } from '../../presentation/helpers/validator/validator-composite'
import { RequiredFieldsValidator, CompareFieldsValidator } from '../../presentation/helpers/validator/'
import { Validator } from '../../presentation/helpers/validator/validator'

jest.mock('../../presentation/helpers/validator/validator-composite')

describe('SignupValidator Factory', () => {
  it('Should call ValidationComposite with all validations', () => {
    makeSignupValidator()
    const validations: Validator[] = []
    for (const validator of ['name', 'email', 'password', 'passwordConfirmation']) {
      validations.push(new RequiredFieldsValidator(validator))
    }
    validations.push(new CompareFieldsValidator('password', 'passwordConfirmation'))
    expect(ValidatorComposite).toHaveBeenCalledWith(validations)
  })
})
