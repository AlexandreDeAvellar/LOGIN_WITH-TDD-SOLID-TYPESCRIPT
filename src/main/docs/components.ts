import { badRequest, notFound, serverError, unauthorized, forbidden } from './components/'
import { apiKeyAuthSchema } from './schemas/'

export default {
  badRequest, notFound, serverError, unauthorized, forbidden, securitySchemes: { apiKeyAuth: apiKeyAuthSchema }
}
