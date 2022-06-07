import request from 'supertest'
import app from '../config/app'

describe('PUT /surveys/:surveyId/result', () => {
  test('should return 403 on save survey result without accessToken', async () => {
    await request(app).put('/api/surveys/surveyId/results').send({ answer: 'any_answer' }).expect(403)
  })
})
