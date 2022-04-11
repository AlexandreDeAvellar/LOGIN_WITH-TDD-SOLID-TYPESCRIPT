import { Validator } from '../../presentation/protocols'
import { InvalidParamError } from '../../presentation/errors'
import { EmailValidator } from '../protocols/email-validator'

export class EmailValidation implements Validator {
  constructor (
    private readonly fieldName: string,
    private readonly emailValidator: EmailValidator
  ) { }

  validate (input: any): Error | null {
    const isValid = this.emailValidator.isValid(input[this.fieldName])
    if (!isValid) return new InvalidParamError(this.fieldName)
    return null
  };
}
