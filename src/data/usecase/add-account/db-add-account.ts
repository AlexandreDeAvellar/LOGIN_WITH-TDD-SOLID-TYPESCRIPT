import { AddAccount, AddAccountModel, AccountModel, Encrypter } from './db-add-account-protocols'

export class DbAddAccount implements AddAccount {
  constructor (private readonly encrypter: Encrypter) {}

  async add (account: AddAccountModel): Promise<AccountModel> {
    const id = await this.encrypter.encrypt(account.password)
    const addAccount: AccountModel = { ...account, id }
    return await new Promise(resolve => resolve(addAccount))
  }
}
