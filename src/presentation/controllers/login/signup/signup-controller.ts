import { EmailInUseError } from '../../../errors'
import { badRequest, serverError, ok, forbidden } from '../../../helpers/http/http-helper'
import { Controller, HttpRequest, HttpResponse, AddAccount, Validator, Authentication } from './signup-protocol'

export class SignUpController implements Controller {
  constructor (
    private readonly addAccount: AddAccount,
    private readonly validator: Validator,
    private readonly authentication: Authentication
  ) { }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validator.validate(httpRequest.body)
      if (error) {
        return badRequest(error)
      }
      const { name, password, email } = httpRequest.body
      const account = await this.addAccount.add({ email, name, password })
      if (account === null) return forbidden(new EmailInUseError())
      const accessToken = await this.authentication.auth({ email, password })
      return ok({ accessToken })
    } catch (error) {
      return serverError(error)
    }
  }
}
