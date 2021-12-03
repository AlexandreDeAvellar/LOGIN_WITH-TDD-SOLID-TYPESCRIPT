import { MissingParamError } from '../../errors'
import { Validator } from './validator'

export class RequiredFieldsValidator implements Validator {
  constructor (private readonly fieldName: string) { }

  validate (input: any): Error | null {
    if (!input[this.fieldName]) return new MissingParamError(this.fieldName)
    return null
  }
}
