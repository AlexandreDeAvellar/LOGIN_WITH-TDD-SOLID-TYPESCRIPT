import { Controller, LoadSurveyResultRepository, HttpRequest, HttpResponse, serverError, forbidden, InvalidParamError } from './load-survey-result-controler-protocols'

export class LoadSurveyResultController implements Controller {
  constructor (
    private readonly loadSurveyResultRepository: LoadSurveyResultRepository
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { surveyId } = httpRequest.params
      const survey = await this.loadSurveyResultRepository.loadBySurveyId(surveyId)
      if (!survey) return forbidden(new InvalidParamError('surveyId'))

      return { statusCode: 204, body: null }
    } catch (error) {
      return serverError(error)
    }
  }
}
