import { AccessDeniedError } from '../../presentation/errors'
import { forbidden } from '../../presentation/helpers/http/http-helper'
import { HttpRequest, HttpResponse, Middleware } from '../../presentation/protocols'

export class AuthMiddleware implements Middleware {
  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    return forbidden(new AccessDeniedError())
  }
}
