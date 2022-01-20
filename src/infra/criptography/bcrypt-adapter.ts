import { Encrypter } from '../../data/protocols/criptography/encrypter'
import bcrypt from 'bcrypt'

export class BcryptAdaper implements Encrypter {
  constructor (private readonly salt: number) { }

  async encrypt (value: string): Promise<string> {
    const hashed = await bcrypt.hash(value, this.salt)
    return hashed
  }
}
