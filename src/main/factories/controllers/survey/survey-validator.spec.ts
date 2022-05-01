import { makeSurveyValidator } from './survey-validator'
import { RequiredFieldsValidator, ValidatorComposite } from '../../../../validation/validator'
import { Validator } from '../../../../presentation/protocols'

jest.mock('../../../../validation/validator/validator-composite')

describe('SurveyValidator Factory', () => {
  test('should call ValidationComposite with all validations', () => {
    makeSurveyValidator()
    const validations: Validator[] = []
    for (const field of ['question', 'answers']) {
      validations.push(new RequiredFieldsValidator(field))
    }
    expect(ValidatorComposite).toHaveBeenCalledWith(validations)
  })
})
