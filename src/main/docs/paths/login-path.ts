export const loginPath = {
  post: {
    tags: ['Login'],
    summary: 'Rota de login',
    requestBody: {
      content: { 'application/json': { schema: { $ref: '#/schemas/loginParams' } } }
    },
    responses: {
      200: {
        description: 'Retorna um access token em caso de sucesso',
        content: {
          'application/json': { schema: { $ref: '#/schemas/account' } }
        }
      },
      400: { $ref: '#/components/badRequest' },
      401: { $ref: '#/components/unauthorized' },
      404: { $ref: '#/components/notFound' },
      500: { $ref: '#/components/serverError' }
    }
  }
}
