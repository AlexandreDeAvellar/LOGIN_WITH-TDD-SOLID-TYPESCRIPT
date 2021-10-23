import { Controller, HttpRequest, HttpResponse } from '../../presentation/protocols'
import { LogControllerDecorator } from './log'

describe('LogController Decorator', () => {
  it('Should call controller handle', async () => {
    class ControllerStub implements Controller {
      async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
        const httpResponse: HttpResponse = { statusCode: 200, body: httpRequest.body }
        return await new Promise(resolve => resolve(httpResponse))
      }
    }

    const httpRequest = {
      body: {
        name: 'any_name',
        email: 'any_email',
        password: 'any_password',
        passwordConfirmation: 'any_password'
      }
    }
    const controllerStub = new ControllerStub()

    const sut = new LogControllerDecorator(controllerStub)
    jest.spyOn(sut, 'handle')
    await sut.handle(httpRequest)

    expect(sut.handle).toBeCalledTimes(1)
    expect(sut.handle).toHaveBeenCalledWith(httpRequest)
  })
})
