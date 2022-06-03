import { LoadSurveyById, Controller, HttpRequest, HttpResponse, forbidden, InvalidParamError } from './save-survey-result-controller-protocols'

export class SaveSurveyResultController implements Controller {
  constructor (private readonly loadSurveyByIdRepository: LoadSurveyById) {}
  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    const { params: { id } } = httpRequest
    const survey = await this.loadSurveyByIdRepository.loadById(id)
    if (!survey) return forbidden(new InvalidParamError('surveyId'))
    return await new Promise(resolve => resolve({ statusCode: 200, body: null }))
  }
}
