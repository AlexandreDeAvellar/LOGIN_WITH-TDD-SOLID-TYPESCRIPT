import { Authentication, AuthenticationModel, HashComparer, Encrypter, LoadAccountByEmailRepository, UpdateAccessToken } from './dh-authentication-protocols'

export class DbAuthentication implements Authentication {
  constructor (
    private readonly loadAccountByEmailRepository: LoadAccountByEmailRepository,
    private readonly hashComparer: HashComparer,
    private readonly encrypter: Encrypter,
    private readonly updateAccessToken: UpdateAccessToken
  ) { }

  async auth (authentication: AuthenticationModel): Promise<string> {
    const account = await this.loadAccountByEmailRepository.loadByEmail(authentication.email)
    if (account) {
      const isValid = await this.hashComparer.compare(authentication.password, account.password)
      if (isValid) {
        const accessToken = await this.encrypter.encrypt(account.id)
        await this.updateAccessToken.updateAccessToken(account.id, accessToken)
        return accessToken
      }
    }
    return ''
  }
}
