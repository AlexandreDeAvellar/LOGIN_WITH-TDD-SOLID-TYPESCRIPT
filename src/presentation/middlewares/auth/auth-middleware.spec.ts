import { AuthMiddleware } from './auth-middleware'
import { AccessDeniedError, AccountModel, forbidden, LoadAccountByToken, ok } from './auth-middleware-protocols'
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
    async load (accessToken: string, role?: string): Promise<AccountModel | null> {
      return await new Promise(resolve => resolve(makeFakeAccountModel()))
    }
  }
  return new LoadAccountByTokenStub()
}

interface SutTypes {
  sut: AuthMiddleware
  loadAccountByTokenStub: LoadAccountByToken
}

const makeSut = (): SutTypes => {
  const loadAccountByTokenStub = makeLoadAccountByTokenStub()
  const sut = new AuthMiddleware(loadAccountByTokenStub)
  return { sut, loadAccountByTokenStub }
}

describe('Auth Middleware', () => {
  test('should return 403 if no x-access-token exists in headers', async () => {
    const { sut } = makeSut()
    const httpRespose = await sut.handle({})
    expect(httpRespose).toEqual(forbidden(new AccessDeniedError()))
  })

  test('should call LoadAccountByToken with correct accessToken', async () => {
    const { sut, loadAccountByTokenStub } = makeSut()
    const loadSpy = jest.spyOn(loadAccountByTokenStub, 'load')
    await sut.handle(makeFakeHttpRequest())
    expect(loadSpy).toHaveBeenCalledWith('any_token')
  })

  test('should return 403 if LoadAccountByToken returns null', async () => {
    const { sut, loadAccountByTokenStub } = makeSut()
    jest.spyOn(loadAccountByTokenStub, 'load').mockReturnValueOnce(new Promise(resolve => resolve(null)))
    const httpResponse = await sut.handle(makeFakeHttpRequest())
    expect(httpResponse).toEqual(forbidden(new AccessDeniedError()))
  })

  test('should return 200 if LoadAccountByToken returns an account', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle(makeFakeHttpRequest())
    expect(httpResponse).toEqual(ok({ accountId: makeFakeAccountModel().id }))
  })
})
