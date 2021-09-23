import { AccountModel } from '../../../domain/models/account'
import { AddAccount, AddAccountModel } from '../../../domain/usecases/add-account'
import { Encrypter } from '../../protocols/encrypter'

export class DbAddAccount implements AddAccount {
  constructor (private readonly encrypter: Encrypter) {}

  async add (account: AddAccountModel): Promise<AccountModel> {
    const id = await this.encrypter.encrypt(account.password)
    const addAccount: AccountModel = { ...account, id }
    return await new Promise(resolve => resolve(addAccount))
  }
}
