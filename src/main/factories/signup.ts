import { DbAddAccount } from '../../data/usecase/add-account/db-add-account'
import { BcryptAdaper } from '../../infra/criptography/bcrypt-adapter'
import { AccountMongoRepository } from '../../infra/db/mongodb/account-repository/account'
import { SignUpController } from '../../presentation/controllers/signup/signup'
import { EmailValidatorAdapter } from '../../utils/email-validator-adapter'

export const makeSignUpController = (): SignUpController => {
  const salt = 12
  const emailValidator = new EmailValidatorAdapter()
  const addAccountRepository = new AccountMongoRepository()
  const bcrypt = new BcryptAdaper(salt)
  const addAccount = new DbAddAccount(bcrypt, addAccountRepository)
  return new SignUpController(emailValidator, addAccount)
}
