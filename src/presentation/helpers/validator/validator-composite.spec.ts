import { ValidatorComposite, Validator } from '.'
import { InvalidParamError, MissingParamError } from '../../errors'

const makeValidatorStub = (): Validator => {
  class ValidatorStub implements Validator {
    validate (input: any): Error | null {
      return null
    };
  }
  return new ValidatorStub()
}

interface TypesSut {
  sut: ValidatorComposite
  validatorStubs: Validator[]
}

const makeSut = (): TypesSut => {
  const validatorStubs = [makeValidatorStub(), makeValidatorStub(), makeValidatorStub()]
  const sut = new ValidatorComposite(validatorStubs)
  return {
    sut,
    validatorStubs
  }
}

describe('Validator Composite', () => {
  test('should return an error if any validation fails', () => {
    const { sut, validatorStubs } = makeSut()
    jest.spyOn(validatorStubs[0], 'validate').mockReturnValueOnce(new MissingParamError('any_field'))
    const error = sut.validate('')
    expect(error).toEqual(new MissingParamError('any_field'))
  })

  test('should return the first error if more then one validator fails', () => {
    const { sut, validatorStubs } = makeSut()
    jest.spyOn(validatorStubs[0], 'validate').mockReturnValueOnce(null)
    jest.spyOn(validatorStubs[1], 'validate').mockReturnValueOnce(new InvalidParamError('any_field'))
    jest.spyOn(validatorStubs[2], 'validate').mockReturnValueOnce(new MissingParamError('any_field'))
    const error = sut.validate({ field: 'any_value' })
    expect(error).toEqual(new InvalidParamError('any_field'))
  })
})
