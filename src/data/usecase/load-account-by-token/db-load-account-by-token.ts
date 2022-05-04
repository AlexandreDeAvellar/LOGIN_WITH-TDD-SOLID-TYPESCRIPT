import { Decrypter, LoadAccountByToken, AccountModel } from './db-load-account-by-token-protocols'

export class DbLoadAccountByToken implements LoadAccountByToken {
  constructor (
    private readonly decrypter: Decrypter
  ) {}

  async load (accessToken: string, role?: string | undefined): Promise<AccountModel | null> {
    await this.decrypter.decrypt(accessToken)
    return null
  }
}
