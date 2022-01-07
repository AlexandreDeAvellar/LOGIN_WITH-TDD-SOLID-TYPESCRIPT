import { DbAddAccount } from '../../data/usecase/add-account/db-add-account'
import { BcryptAdaper } from '../../infra/criptography/bcrypt-adapter'
import { AccountMongoRepository } from '../../infra/db/mongodb/account-repository/account'
import { LogMongoRepository } from '../../infra/db/mongodb/log-repository/log'
import { SignUpController } from '../../presentation/controllers/signup/signup'
import { Controller } from '../../presentation/protocols'
import { LogControllerDecorator } from '../decorators/log'
import { makeSignupValidator } from './signup-validator'

export const makeSignUpController = (): Controller => {
  const salt = 12
  const addAccountRepository = new AccountMongoRepository()
  const bcrypt = new BcryptAdaper(salt)
  const addAccount = new DbAddAccount(bcrypt, addAccountRepository)
  const signUpController = new SignUpController(addAccount, makeSignupValidator())
  const logMongoRepository = new LogMongoRepository()
  return new LogControllerDecorator(signUpController, logMongoRepository)
}
