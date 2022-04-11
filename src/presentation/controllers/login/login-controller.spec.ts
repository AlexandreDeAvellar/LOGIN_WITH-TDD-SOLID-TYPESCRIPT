import { InvalidParamError, MissingParamError } from '../../errors'
import { serverError, unauthorized, ok, badRequest } from '../../helpers/http/http-helper'
import { LoginController } from './login-controller'
import { HttpRequest, Authentication, AuthenticationModel, Validator } from './login-protocol'

interface sutTypes {
  sut: LoginController
  validatorStub: Validator
  authenticationStub: Authentication
}

const makeValidatorStub = (): Validator => {
  class ValidatorStub implements Validator {
    validate (input: any): Error | null {
      return null
    }
  }
  return new ValidatorStub()
}

const makeHttpRequest = (): HttpRequest => {
  return ({
    body: {
      email: 'any_email@mail.com',
      password: 'any_password'
    }
  })
}

const makeAuthenticationStub = (): Authentication => {
  class AuthenticationStub implements Authentication {
    async auth (authentication: AuthenticationModel): Promise<string> {
      return await new Promise(resolve => resolve('valid_token'))
    }
  }
  return new AuthenticationStub()
}

const makeSut = (): sutTypes => {
  const validatorStub = makeValidatorStub()
  const authenticationStub = makeAuthenticationStub()
  const sut = new LoginController(validatorStub, authenticationStub)

  return {
    sut,
    validatorStub,
    authenticationStub
  }
}

describe('Login Controller', () => {
  test('should return MissingParam if any field is missing', async () => {
    const { sut, validatorStub } = makeSut()
    jest.spyOn(validatorStub, 'validate').mockReturnValueOnce(new MissingParamError('any_field'))
    const error = await sut.handle({})
    expect(error).toEqual(badRequest(new MissingParamError('any_field')))
  })

  test('should return InvalidParam if any field fails', async () => {
    const { sut, validatorStub } = makeSut()
    jest.spyOn(validatorStub, 'validate').mockReturnValueOnce(new InvalidParamError('any_field'))
    const error = await sut.handle({})
    expect(error).toEqual(badRequest(new InvalidParamError('any_field')))
  })

  it('Should call Authentication with correct values', async () => {
    const { sut, authenticationStub } = makeSut()
    const authSpy = jest.spyOn(authenticationStub, 'auth')
    await sut.handle(makeHttpRequest())
    expect(authSpy).toBeCalledWith({ email: 'any_email@mail.com', password: 'any_password' })
  })

  it('Should return 401 if invalid credentials are provided', async () => {
    const { sut, authenticationStub } = makeSut()
    jest.spyOn(authenticationStub, 'auth').mockReturnValueOnce(new Promise(resolve => resolve('')))
    const httpResponse = await sut.handle(makeHttpRequest())
    expect(httpResponse).toEqual(unauthorized())
  })

  it('Should return 500 if Authentication throws', async () => {
    const { sut, authenticationStub } = makeSut()
    jest.spyOn(authenticationStub, 'auth').mockImplementationOnce(() => {
      throw new Error()
    })
    const httpResponse = await sut.handle(makeHttpRequest())
    expect(httpResponse).toEqual(serverError(new Error()))
  })

  it('Should return 200 if valid credentials are provided', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle(makeHttpRequest())
    expect(httpResponse).toEqual(ok({ accessToken: 'valid_token' }))
  })
})
