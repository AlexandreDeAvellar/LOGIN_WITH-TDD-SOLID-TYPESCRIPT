import { LogMongoRepository } from '../../../../infra/db/mongodb/log-repository/log-mongo-repository'
import { SignUpController } from '../../../../presentation/controllers/signup/signup-controller'
import { Controller } from '../../../../presentation/protocols'
import { LogControllerDecorator } from '../../../decorators/log-controller-decorator'
import { makeDbAddAccountFactory } from '../../usecases/add-account/db-add-account-factory'
import { makeAuthenticationFactory } from '../../usecases/authentication/db-authentication-factory'
import { makeSignupValidator } from './signup-validator'

export const makeSignUpController = (): Controller => {
  const signUpController = new SignUpController(makeDbAddAccountFactory(), makeSignupValidator(), makeAuthenticationFactory())
  const logMongoRepository = new LogMongoRepository()
  return new LogControllerDecorator(signUpController, logMongoRepository)
}
