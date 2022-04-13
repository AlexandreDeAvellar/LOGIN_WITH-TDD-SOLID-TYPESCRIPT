import { Controller, HttpRequest, HttpResponse, Validator } from './add-survey-protocol'

export class AddSurveyController implements Controller {
  constructor (
    private readonly validator: Validator
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    this.validator.validate(httpRequest.body)
    const httpResponse: HttpResponse = {
      statusCode: 200,
      body: ''
    }
    return await new Promise(resolve => resolve(httpResponse))
  }
}
