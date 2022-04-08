import { AddAccount } from '../../../../domain/usecases/add-account'
import { DbAddAccount } from '../../../../data/usecase/add-account/db-add-account'
import { BcryptAdaper } from '../../../../infra/criptography/bcrypt-adapter/bcrypt-adapter'
import { AccountMongoRepository } from '../../../../infra/db/mongodb/account-repository/account-mongo-repository'

export const makeDbAddAccountFactory = (): AddAccount => {
  const salt = 12
  const addAccountRepository = new AccountMongoRepository()
  const bcrypt = new BcryptAdaper(salt)
  return new DbAddAccount(bcrypt, addAccountRepository, addAccountRepository)
}
