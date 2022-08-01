import { Controller, LoadSurveyResultRepository, HttpRequest, HttpResponse, serverError, forbidden, InvalidParamError, LoadSurveyByIdRepository, ok } from './load-survey-result-controler-protocols'

export class LoadSurveyResultController implements Controller {
  constructor (
    private readonly loadSurveyByIdRepository: LoadSurveyByIdRepository,
    private readonly loadSurveyResultRepository: LoadSurveyResultRepository
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { surveyId } = httpRequest.params
      const survey = await this.loadSurveyByIdRepository.loadById(surveyId)

      if (!survey) return forbidden(new InvalidParamError('surveyId'))

      const surveyResult = await this.loadSurveyResultRepository.loadBySurveyId(surveyId)

      return ok(surveyResult)
    } catch (error) {
      return serverError(error)
    }
  }
}
