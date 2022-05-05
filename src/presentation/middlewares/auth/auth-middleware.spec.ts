import { AuthMiddleware } from './auth-middleware'
import { AccessDeniedError, AccountModel, forbidden, LoadAccountByToken, ok, serverError } from './auth-middleware-protocols'
import { HttpRequest } from '../../protocols'

const makeFakeHttpRequest = (): HttpRequest => ({
  headers: { 'x-access-token': 'any_token' }
})

const makeFakeAccountModel = (): AccountModel => ({
  id: 'any_id',
  name: 'any_name',
  email: 'any_mail@mail.com',
  password: 'any_password'
})

const makeLoadAccountByTokenStub = (): LoadAccountByToken => {
  class LoadAccountByTokenStub implements LoadAccountByToken {
    async loadByToken (accessToken: string, role?: string): Promise<AccountModel | null> {
      return await new Promise(resolve => resolve(makeFakeAccountModel()))
    }
  }
  return new LoadAccountByTokenStub()
}

interface SutTypes {
  sut: AuthMiddleware
  loadAccountByTokenStub: LoadAccountByToken
}

const makeSut = (role?: string): SutTypes => {
  const loadAccountByTokenStub = makeLoadAccountByTokenStub()
  const sut = new AuthMiddleware(loadAccountByTokenStub, role)
  return { sut, loadAccountByTokenStub }
}

describe('Auth Middleware', () => {
  test('should return 403 if no x-access-token exists in headers', async () => {
    const { sut } = makeSut()
    const httpRespose = await sut.handle({})
    expect(httpRespose).toEqual(forbidden(new AccessDeniedError()))
  })

  test('should call LoadAccountByToken with correct accessToken', async () => {
    const role = 'any_role'
    const { sut, loadAccountByTokenStub } = makeSut(role)
    const loadSpy = jest.spyOn(loadAccountByTokenStub, 'loadByToken')
    await sut.handle(makeFakeHttpRequest())
    expect(loadSpy).toHaveBeenCalledWith('any_token', role)
  })

  test('should return 403 if LoadAccountByToken returns null', async () => {
    const { sut, loadAccountByTokenStub } = makeSut()
    jest.spyOn(loadAccountByTokenStub, 'loadByToken').mockReturnValueOnce(new Promise(resolve => resolve(null)))
    const httpResponse = await sut.handle(makeFakeHttpRequest())
    expect(httpResponse).toEqual(forbidden(new AccessDeniedError()))
  })

  test('should return 500 if LoadAccountByToken throws', async () => {
    const { sut, loadAccountByTokenStub } = makeSut()
    jest.spyOn(loadAccountByTokenStub, 'loadByToken').mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())))
    const httpResponse = await sut.handle(makeFakeHttpRequest())
    expect(httpResponse).toEqual(serverError(new Error()))
  })

  test('should return 200 if LoadAccountByToken returns an account', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle(makeFakeHttpRequest())
    expect(httpResponse).toEqual(ok({ accountId: makeFakeAccountModel().id }))
  })
})
