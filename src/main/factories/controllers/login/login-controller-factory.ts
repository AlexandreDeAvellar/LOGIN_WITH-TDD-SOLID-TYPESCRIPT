import { LoginController } from '../../../../presentation/controllers/login/login/login-controller'
import { Controller } from '../../../../presentation/protocols'
import { makeLoginValidator } from './login-validator-factory'
import { makeAuthenticationFactory } from '../../usecases/authentication/db-authentication-factory'
import { makeLogControllerDecorator } from '../../decorators/log-controller-decorator-factory'

export const makeLoginController = (): Controller => {
  const loginController = new LoginController(makeLoginValidator(), makeAuthenticationFactory())
  return makeLogControllerDecorator(loginController)
}
