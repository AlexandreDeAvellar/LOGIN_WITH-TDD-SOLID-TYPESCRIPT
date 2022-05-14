import { Controller, HttpRequest, HttpResponse, LoadSurveys, ok, serverError } from './load-surveys-controller-protocols'

export class LoadSurveysController implements Controller {
  constructor (private readonly loadSurveys: LoadSurveys) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const httpResponse = await this.loadSurveys.load()
      return ok(httpResponse)
    } catch (error) {
      return serverError(error)
    }
  }
}
