import env from '../../config/env'
import { DbAuthentication } from '../../../data/usecase/authentication/db-authentication'
import { BcryptAdaper } from '../../../infra/criptography/bcrypt-adapter/bcrypt-adapter'
import { JwtAdapter } from '../../../infra/criptography/jwt-adapter/jwt-adapter'
import { AccountMongoRepository } from '../../../infra/db/mongodb/account-repository/account-mongo-repository'
import { LogMongoRepository } from '../../../infra/db/mongodb/log-repository/log-mongo-repository'
import { LoginController } from '../../../presentation/controllers/login/login-controller'
import { Controller } from '../../../presentation/protocols'
import { LogControllerDecorator } from '../../decorators/log-controller-decorator'
import { makeLoginValidator } from './login-validator-factory'

export const makeLoginController = (): Controller => {
  const accountMongoRepository = new AccountMongoRepository()
  const salt = 12
  const hashComparer = new BcryptAdaper(salt)
  const encrypt = new JwtAdapter(env.jwtSecret)
  const authentication = new DbAuthentication(accountMongoRepository, hashComparer, encrypt, accountMongoRepository)
  const loginController = new LoginController(makeLoginValidator(), authentication)
  const logErrorRepository = new LogMongoRepository()
  return new LogControllerDecorator(loginController, logErrorRepository)
}
