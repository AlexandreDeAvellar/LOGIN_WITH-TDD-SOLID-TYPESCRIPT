import { Controller, LoadSurveyResultRepository, HttpRequest, HttpResponse, serverError } from './load-survey-result-controler-protocols'

export class LoadSurveyResultController implements Controller {
  constructor (
    private readonly loadSurveyResultRepository: LoadSurveyResultRepository
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { surveyId } = httpRequest.params
      await this.loadSurveyResultRepository.loadBySurveyId(surveyId)
      return { statusCode: 204, body: null }
    } catch (error) {
      return serverError(error)
    }
  }
}
