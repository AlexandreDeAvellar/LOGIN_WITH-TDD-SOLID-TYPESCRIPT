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

  // it('should return null if field is informed', () => {
  //   const sut = makeSut()
  //   const error = sut.validate({ any_field: 'any_value' })
  //   expect(error).toBe(null)
  // })
})
