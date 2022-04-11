import { RequiredFieldsValidator } from '.'
import { MissingParamError } from '../../presentation/errors'

const makeSut = (): RequiredFieldsValidator => {
  return new RequiredFieldsValidator('any_field')
}

describe('RequiredField Validator', () => {
  it('should return MissingParam if field is missing', () => {
    const sut = makeSut()
    const error = sut.validate({})
    expect(error).toEqual(new MissingParamError('any_field'))
  })

  it('should return null if field is informed', () => {
    const sut = makeSut()
    const error = sut.validate({ any_field: 'any_value' })
    expect(error).toBe(null)
  })
})
