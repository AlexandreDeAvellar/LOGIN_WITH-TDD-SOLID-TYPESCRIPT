import { badRequest, Controller, HttpRequest, HttpResponse, AddSurvey, Validator, serverError } from './add-survey-protocol'

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
        answers
      })
      const httpResponse: HttpResponse = {
        statusCode: 200,
        body: ''
      }
      return await new Promise(resolve => resolve(httpResponse))
    } catch (error) {
      return serverError(error)
    }
  }
}
