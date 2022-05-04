import { DbLoadAccountByToken } from './db-load-account-by-token'
import { Decrypter } from './db-load-account-by-token-protocols'

const makeDecrypterStub = (): Decrypter => {
  class DecrypterStub implements Decrypter {
    async decrypt (accountToken: string): Promise<string> {
      return await new Promise(resolve => resolve('any_token'))
    }
  }
  return new DecrypterStub()
}

interface SutTypes {
  sut: DbLoadAccountByToken
  decrypterStub: Decrypter
}

const makeSut = (): SutTypes => {
  const decrypterStub = makeDecrypterStub()
  const sut = new DbLoadAccountByToken(decrypterStub)
  return { sut, decrypterStub }
}

describe('DbLoadAccountByToken Usecase', () => {
  test('should call Decrypter with correct values', async () => {
    const { sut, decrypterStub } = makeSut()
    const decryptSpy = jest.spyOn(decrypterStub, 'decrypt')
    await sut.load('any_token')
    expect(decryptSpy).toHaveBeenCalledWith('any_token')
  })
})
