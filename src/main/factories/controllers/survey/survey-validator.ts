import { Validator } from '../../../../presentation/protocols'
import { RequiredFieldsValidator, ValidatorComposite } from '../../../../validation/validator'

export const makeSurveyValidator = (): ValidatorComposite => {
  const validations: Validator[] = []
  for (const field of ['question', 'answers']) {
    validations.push(new RequiredFieldsValidator(field))
  }
  return new ValidatorComposite(validations)
}
