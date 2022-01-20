import LogErrorRepositoryProtocol from '../../data/protocols/db/log-error-repository'
import { Controller, HttpRequest, HttpResponse } from '../../presentation/protocols'

export class LogControllerDecorator implements Controller {
  constructor (private readonly controller: Controller, private readonly logErrorRepositopry: LogErrorRepositoryProtocol) { }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    const httpResponse = await this.controller.handle(httpRequest)
    if (httpResponse.statusCode === 500) {
      const stackError = httpResponse.body.stack
      await this.logErrorRepositopry.logError(stackError)
      return httpResponse
    }
    return httpResponse
  }
}
