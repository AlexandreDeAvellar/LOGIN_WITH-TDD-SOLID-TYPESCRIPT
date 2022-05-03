import { AuthMiddleware } from './authMiddleware'
import { forbidden } from '../../presentation/helpers/http/http-helper'
import { AccessDeniedError } from '../../presentation/errors'

interface SutTypes {
  sut: AuthMiddleware
}

const makeSut = (): SutTypes => {
  const sut = new AuthMiddleware()
  return { sut }
}

describe('Auth Middleware', () => {
  test('should return 403 if no x-access-token exists in headers', async () => {
    const { sut } = makeSut()
    const httpRespose = await sut.handle({})
    expect(httpRespose).toEqual(forbidden(new AccessDeniedError()))
  })
})
