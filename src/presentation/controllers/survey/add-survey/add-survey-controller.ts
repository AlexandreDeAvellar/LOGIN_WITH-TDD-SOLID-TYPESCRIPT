import { badRequest, Controller, HttpRequest, HttpResponse, AddSurvey, Validator, serverError, noContent } from './add-survey-protocol'

export class AddSurveyController implements Controller {
  constructor (
    private readonly validator: Validator,
    private readonly survey: AddSurvey
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const validateResponse = this.validator.validate(httpRequest.body)
      if (validateResponse) return badRequest(validateResponse)
      const { question, answers } = httpRequest.body
      await this.survey.add({
        question,
        answers,
        date: new Date()
      })
      return noContent()
    } catch (error) {
      return serverError(error)
    }
  }
}
