import { Controller, HttpRequest, HttpResponse, LoadSurveys, serverError } from './load-surveys-controller-protocols'

export class LoadSurveysController implements Controller {
  constructor (private readonly loadSurveys: LoadSurveys) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      await this.loadSurveys.load()
      return { statusCode: 200, body: {} }
    } catch (error) {
      return serverError(error)
    }
  }
}
