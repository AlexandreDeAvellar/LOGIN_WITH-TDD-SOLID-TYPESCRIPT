import { AddAccount, AddAccountModel, AccountModel, Hasher, AddAccountRepository } from './db-add-account-protocols'

export class DbAddAccount implements AddAccount {
  constructor (
    private readonly hash: Hasher,
    private readonly addAccountRepository: AddAccountRepository
  ) { }

  async add (accountData: AddAccountModel): Promise<AccountModel | null> {
    const hashedPassword = await this.hash.hash(accountData.password)
    const newAccount = { ...accountData, password: hashedPassword }
    const account: AccountModel = await this.addAccountRepository.add(newAccount)
    return account
  }
}
