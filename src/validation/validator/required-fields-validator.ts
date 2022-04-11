import { MissingParamError } from '../../presentation/errors'
import { Validator } from '../../presentation/protocols'

export class RequiredFieldsValidator implements Validator {
  constructor (private readonly fieldName: string) { }

  validate (input: any): Error | null {
    if (!input[this.fieldName]) return new MissingParamError(this.fieldName)
    return null
  }
}
