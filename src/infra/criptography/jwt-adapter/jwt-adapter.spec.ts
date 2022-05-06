import jwt from 'jsonwebtoken'
import { JwtAdapter } from './jwt-adapter'

jest.mock('jsonwebtoken', () => ({
  async sign (): Promise<string> {
    return await new Promise(resolve => resolve('any_token'))
  },
  async verify (): Promise<string> {
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

    test('should return token if sign succeds', async () => {
      const sut = makeSut()
      // const signSpy = jest.spyOn(jwt, 'sign')
      const AccessToken = await sut.encrypt('any_value')
      expect(AccessToken).toBe('any_token')
    })
  })

  describe('verify()', () => {
    test('should call verify with correct values', async () => {
      const sut = makeSut()
      const verifySpy = jest.spyOn(jwt, 'verify')
      await sut.decrypt('any_value')
      expect(verifySpy).toBeCalledWith('any_value', 'secret')
    })

    test('should throw if verify throws', async () => {
      const sut = makeSut()
      jest.spyOn(jwt, 'verify').mockImplementationOnce(() => { throw new Error() })
      const promise = sut.decrypt('any_value')
      await expect(promise).rejects.toThrow()
    })

    test('should return a value on verify success', async () => {
      const sut = makeSut()
      const value = await sut.decrypt('any_value')
      expect(value).toBe('any_token')
    })
  })
})
