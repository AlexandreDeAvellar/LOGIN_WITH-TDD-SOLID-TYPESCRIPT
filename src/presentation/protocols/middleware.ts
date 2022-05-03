import { HttpRequest, HttpResponse } from './http'

export interface Middleware {
  load: (httpRequest: HttpRequest) => Promise<HttpResponse>
}
