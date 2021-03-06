import { AuthMiddleware } from '../../../presentation/middlewares/auth/auth-middleware'
import { Middleware } from '../../../presentation/protocols'
import { makeDbLoadAccountByToken } from '../usecases/load-account-by-token/db-load-account-by-token'

export const makeAuthMiddleware = (role?: string): Middleware => {
  return new AuthMiddleware(makeDbLoadAccountByToken(), role)
}
