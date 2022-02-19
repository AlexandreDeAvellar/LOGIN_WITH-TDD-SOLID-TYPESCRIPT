import { DbAddAccount } from '../../../data/usecase/add-account/db-add-account'
import { BcryptAdaper } from '../../../infra/criptography/bcrypt-adapter/bcrypt-adapter'
import { AccountMongoRepository } from '../../../infra/db/mongodb/account-repository/account-mongo-repository'
import { LogMongoRepository } from '../../../infra/db/mongodb/log-repository/log-mongo-repository'
import { SignUpController } from '../../../presentation/controllers/signup/signup-controller'
import { Controller } from '../../../presentation/protocols'
import { LogControllerDecorator } from '../../decorators/log-controller-decorator'
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
