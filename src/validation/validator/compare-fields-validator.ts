import { InvalidParamError } from '../../presentation/errors'
import { Validator } from '../../presentation/protocols'

export class CompareFieldsValidator implements Validator {
  constructor (
    private readonly fieldName: string,
    private readonly compareFieldName: string
  ) {}

  validate (input: any): Error | null {
    if (input[this.fieldName] !== input[this.compareFieldName]) {
      return new InvalidParamError(this.compareFieldName)
    }
    return null
  };
}
