import { MissingParamError } from '../../errors'
import { badRequest } from '../../helpers/http-helper'
import { LoginController } from './login'

interface sutTypes {
  sut: LoginController
}

const makeSut = (): sutTypes => {
  const sut = new LoginController()

  return {
    sut
  }
}

describe('Login Controller', () => {
  it('Should return 400 if no email is provided', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        password: 'any_password'
      }
    }
    const httpRespose = await sut.handle(httpRequest)
    expect(httpRespose).toEqual(badRequest(new MissingParamError('email')))
  })
})
