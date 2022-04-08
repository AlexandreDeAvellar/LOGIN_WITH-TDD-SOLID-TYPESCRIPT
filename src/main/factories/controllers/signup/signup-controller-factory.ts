import { SignUpController } from '../../../../presentation/controllers/signup/signup-controller'
import { Controller } from '../../../../presentation/protocols'
import { makeLogControllerDecorator } from '../../decorators/log-controller-decorator-factory'
import { makeDbAddAccountFactory } from '../../usecases/add-account/db-add-account-factory'
import { makeAuthenticationFactory } from '../../usecases/authentication/db-authentication-factory'
import { makeSignupValidator } from './signup-validator'

export const makeSignUpController = (): Controller => {
  const signUpController = new SignUpController(makeDbAddAccountFactory(), makeSignupValidator(), makeAuthenticationFactory())
  return makeLogControllerDecorator(signUpController)
}
