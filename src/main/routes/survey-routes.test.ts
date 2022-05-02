import { Collection } from 'mongodb'
import request from 'supertest'
import { MongoHelper } from '../../infra/db/mongodb/helpers/mongo-helper'
import app from '../config/app'

let surveysCollection: Collection

beforeAll(async () => await MongoHelper.connect(process.env.MONGO_URL as string))
beforeEach(async () => {
  surveysCollection = await MongoHelper.getCollection('surveys')
  await surveysCollection.deleteMany({})
})
afterAll(async () => await MongoHelper.disconnect())

describe('Survey Routes', () => {
  describe('POST /surveys', () => {
    test('should return 204 on add survey success', async () => {
      await request(app).post('/api/surveys').send({
        question: 'any_question',
        answers: [{ image: 'any_image', answer: 'any_answer' }]
      }).expect(204)
    })
  })
})
