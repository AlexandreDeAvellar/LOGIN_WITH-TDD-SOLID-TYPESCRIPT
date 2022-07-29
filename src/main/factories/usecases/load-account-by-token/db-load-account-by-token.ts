import { DbLoadAccountByToken } from '../../../../data/usecase/load-account-by-token/db-load-account-by-token'
import { LoadAccountByToken } from '../../../../domain/usecases/account/load-account-by-token'
import { JwtAdapter } from '../../../../infra/criptography/jwt-adapter/jwt-adapter'
import { AccountMongoRepository } from '../../../../infra/db/mongodb/account-repository/account-mongo-repository'
import env from '../../../config/env'

export const makeDbLoadAccountByToken = (): LoadAccountByToken => {
  const decrypt = new JwtAdapter(env.jwtSecret)
  const accountMongoRepository = new AccountMongoRepository()
  return new DbLoadAccountByToken(decrypt, accountMongoRepository)
}
