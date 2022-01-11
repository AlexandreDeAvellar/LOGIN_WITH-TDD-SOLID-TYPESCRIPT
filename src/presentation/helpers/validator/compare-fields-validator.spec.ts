import { CompareFieldsValidator } from '.'
import { InvalidParamError } from '../../errors'

const makeSut = (): CompareFieldsValidator => {
  return new CompareFieldsValidator('field', 'fieldToCompare')
}

describe('RequiredField Validator', () => {
  it('should return InvalidParam if fields are not equals', () => {
    const sut = makeSut()
    const data = { field: 'any_value', fieldToCompare: 'other_value' }
    const error = sut.validate(data)
    expect(error).toEqual(new InvalidParamError('fieldToCompare'))
  })

  it('should return null if the fields are equals', () => {
    const sut = makeSut()
    const data = { field: 'any_value', fieldToCompare: 'any_value' }
    const error = sut.validate(data)
    expect(error).toBe(null)
  })
})
