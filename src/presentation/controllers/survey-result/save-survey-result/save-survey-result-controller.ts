import { LoadSurveyById, Controller, HttpRequest, HttpResponse, forbidden, InvalidParamError, serverError } from './save-survey-result-controller-protocols'

export class SaveSurveyResultController implements Controller {
  constructor (
    private readonly loadSurveyById: LoadSurveyById
  ) { }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { params: { id }, body: { answer }, accountId } = httpRequest

      const survey = await this.loadSurveyById.loadById(id)
      if (!survey) return forbidden(new InvalidParamError('surveyId'))

      const answers = survey.answers.map(answer => answer.answer)
      if (!answers.includes(answer)) return forbidden(new InvalidParamError('answer'))

      if (!accountId) return forbidden(new InvalidParamError('accoundId'))

      return await new Promise(resolve => resolve({ statusCode: 200, body: answer }))
    } catch (error) {
      return serverError(error)
    }
  }
}