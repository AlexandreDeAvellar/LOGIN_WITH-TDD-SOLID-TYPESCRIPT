import bcrypt from 'bcrypt'
import { BcryptAdaper } from './bcrypt-adapter'

jest.mock('bcrypt', () => ({
  async hash (): Promise<string> {
    return await new Promise(resolve => resolve('hash'))
  }
}))

describe('Bcrypt Adaper', () => {
  it('Should call bcrypt with correct values', async () => {
    const salt = 12
    const sut = new BcryptAdaper(salt)
    const hashSpy = jest.spyOn(bcrypt, 'hash')
    await sut.encrypt('any_value')
    expect(hashSpy).toHaveBeenCalledWith('any_value', salt)
  })

  it('Should return hash on success', async () => {
    const salt = 12
    const sut = new BcryptAdaper(salt)
    const hash = await sut.encrypt('any_value')
    expect(hash).toBe('hash')
  })
})
