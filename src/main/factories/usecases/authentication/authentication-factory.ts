import { DbAuthentication } from '../../../../data/usecase/authentication/db-authentication'
import { Authentication } from '../../../../domain/usecases/authentication'
import { BcryptAdaper } from '../../../../infra/criptography/bcrypt-adapter/bcrypt-adapter'
import { JwtAdapter } from '../../../../infra/criptography/jwt-adapter/jwt-adapter'
import { AccountMongoRepository } from '../../../../infra/db/mongodb/account-repository/account-mongo-repository'
import env from '../../../config/env'

export const makeAuthenticationFactory = (): Authentication => {
  const accountMongoRepository = new AccountMongoRepository()
  const salt = 12
  const hashComparer = new BcryptAdaper(salt)
  const encrypter = new JwtAdapter(env.jwtSecret)
  return new DbAuthentication(accountMongoRepository, hashComparer, encrypter, accountMongoRepository)
}
