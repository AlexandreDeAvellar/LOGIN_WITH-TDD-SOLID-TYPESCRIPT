import { ValidatorComposite, Validator } from '.'
import { MissingParamError } from '../../errors'

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
  validatorStub: Validator
}

const makeSut = (): TypesSut => {
  const validatorStub = makeValidatorStub()
  const sut = new ValidatorComposite([validatorStub])
  return {
    sut,
    validatorStub
  }
}

describe('Validator Composite', () => {
  test('should return an error if any validation fails', () => {
    const { sut, validatorStub } = makeSut()
    jest.spyOn(validatorStub, 'validate').mockReturnValueOnce(new MissingParamError('any_field'))
    const error = sut.validate('')
    expect(error).toEqual(new MissingParamError('any_field'))
  })
})
