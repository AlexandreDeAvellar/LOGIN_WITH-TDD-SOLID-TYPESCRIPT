import { badRequest, Controller, HttpRequest, HttpResponse, Validator } from './add-survey-protocol'

export class AddSurveyController implements Controller {
  constructor (
    private readonly validator: Validator
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    const validateResponse = this.validator.validate(httpRequest.body)
    if (validateResponse) return badRequest(validateResponse)
    const httpResponse: HttpResponse = {
      statusCode: 200,
      body: ''
    }
    return await new Promise(resolve => resolve(httpResponse))
  }
}
