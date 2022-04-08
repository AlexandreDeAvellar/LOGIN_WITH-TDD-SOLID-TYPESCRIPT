import { LogMongoRepository } from '../../../../infra/db/mongodb/log-repository/log-mongo-repository'
import { LoginController } from '../../../../presentation/controllers/login/login-controller'
import { Controller } from '../../../../presentation/protocols'
import { LogControllerDecorator } from '../../../decorators/log-controller-decorator'
import { makeLoginValidator } from './login-validator-factory'
import { makeAuthenticationFactory } from '../../usecases/authentication/authentication-factory'

export const makeLoginController = (): Controller => {
  const loginController = new LoginController(makeLoginValidator(), makeAuthenticationFactory())
  const logErrorRepository = new LogMongoRepository()
  return new LogControllerDecorator(loginController, logErrorRepository)
}
