import jwt from 'jsonwebtoken'
import { Decrypter, Encrypter } from './jwt-adapter-protocols'

export class JwtAdapter implements Encrypter, Decrypter {
  constructor (private readonly secret: string) {}

  async encrypt (value: string): Promise<string> {
    const token = await jwt.sign({ id: value }, this.secret)
    return token
  }

  async decrypt (accessToken: string): Promise<string | null> {
    await jwt.verify(accessToken, this.secret)
    return await new Promise(resolve => resolve('any_token'))
  }
}
