import { LoadSurveyByIdRepository, Controller, HttpRequest, HttpResponse } from './save-survey-result-controller-protocols'

export class SaveSurveyResultController implements Controller {
  constructor (private readonly loadSurveyByIdRepository: LoadSurveyByIdRepository) {}
  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    const { params: { id } } = httpRequest
    await this.loadSurveyByIdRepository.loadById(id)
    return await new Promise(resolve => resolve({ statusCode: 200, body: null }))
  }
}
