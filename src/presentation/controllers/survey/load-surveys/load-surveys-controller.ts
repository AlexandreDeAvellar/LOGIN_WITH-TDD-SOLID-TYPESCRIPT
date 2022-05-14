import { Controller, HttpRequest, HttpResponse, LoadSurveys, noContent, ok, serverError } from './load-surveys-controller-protocols'

export class LoadSurveysController implements Controller {
  constructor (private readonly loadSurveys: LoadSurveys) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const httpResponse = await this.loadSurveys.load()
      return httpResponse.length ? ok(httpResponse) : noContent()
    } catch (error) {
      return serverError(error)
    }
  }
}
