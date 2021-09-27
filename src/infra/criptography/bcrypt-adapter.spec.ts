import bcrypt from 'bcrypt'
import { BcryptAdaper } from './bcrypt-adapter'

describe('Bcrypt Adaper', () => {
  it('Should call bcrypt with correct values', async () => {
    const salt = 12
    const sut = new BcryptAdaper(salt)
    const hashSpy = jest.spyOn(bcrypt, 'hash')
    await sut.encrypt('any_value')
    expect(hashSpy).toHaveBeenCalledWith('any_value', salt)
  })
})
