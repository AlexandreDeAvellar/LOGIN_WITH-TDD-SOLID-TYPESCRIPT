import { LoadAccountByEmailRepository } from '../authentication/dh-authentication-protocols'
import { AddAccount, AddAccountModel, AccountModel, Hasher, AddAccountRepository } from './db-add-account-protocols'

export class DbAddAccount implements AddAccount {
  constructor (
    private readonly hasher: Hasher,
    private readonly addAccountRepository: AddAccountRepository,
    private readonly loadAccountByEmailRepository: LoadAccountByEmailRepository
  ) { }

  async add (accountData: AddAccountModel): Promise<AccountModel | null> {
    const emailInUse = await this.loadAccountByEmailRepository.loadByEmail(accountData.email)
    if (emailInUse) return null
    const hashedPassword = await this.hasher.hash(accountData.password)
    const newAccount = { ...accountData, password: hashedPassword }
    const account: AccountModel = await this.addAccountRepository.add(newAccount)
    return account
  }
}
