import { Validator } from '../../presentation/protocols'

export class ValidatorComposite implements Validator {
  constructor (private readonly validatorField: Validator[]) { }

  validate (input: any): Error | null {
    for (const field of this.validatorField) {
      const error = field.validate(input)
      if (error) return error
    }
    return null
  }
}
