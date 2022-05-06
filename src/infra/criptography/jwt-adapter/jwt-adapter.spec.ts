import jwt from 'jsonwebtoken'
import { JwtAdapter } from './jwt-adapter'

jest.mock('jsonwebtoken', () => ({
  async sign (): Promise<string> {
    return await new Promise(resolve => resolve('any_token'))
  }
}))

const makeSut = (): JwtAdapter => {
  return new JwtAdapter('secret')
}

describe('JWT Adapter', () => {
  describe('sign()', () => {
    test('should call sign with correct values', async () => {
      const sut = makeSut()
      const signSpy = jest.spyOn(jwt, 'sign')
      await sut.encrypt('any_value')
      expect(signSpy).toBeCalledWith({ id: 'any_value' }, 'secret')
    })

    test('should throws if sign throws', async () => {
      const sut = makeSut()
      jest.spyOn(jwt, 'sign').mockImplementationOnce(() => {
        throw new Error()
      })
      const promise = sut.encrypt('any_value')
      await expect(promise).rejects.toThrow()
    })

    test('should return token if sign suceeds', async () => {
      const sut = makeSut()
      // const signSpy = jest.spyOn(jwt, 'sign')
      const AccessToken = await sut.encrypt('any_value')
      expect(AccessToken).toBe('any_token')
    })
  })
})
