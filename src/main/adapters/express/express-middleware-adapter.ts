import { NextFunction, Request, Response } from 'express'
import { HttpRequest, HttpResponse, Middleware } from '../../../presentation/protocols'

export const adaptMiddleware = (middleware: Middleware) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const httpRequest: HttpRequest = { headers: req.headers }
    const httpResponse: HttpResponse = await middleware.handle(httpRequest)
    if (httpResponse.statusCode === 200) {
      Object.assign(req, httpResponse.body)
      next()
    } else {
      const { statusCode, body } = httpResponse
      res.status(statusCode).json({ error: body.message })
    }
  }
}
