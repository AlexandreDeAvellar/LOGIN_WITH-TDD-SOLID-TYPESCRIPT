import { Collection, ObjectId } from 'mongodb'
import request from 'supertest'
import { MongoHelper } from '../../infra/db/mongodb/helpers/mongo-helper'
import app from '../config/app'
import { sign } from 'jsonwebtoken'
import env from '../config/env'

let surveysCollection: Collection
let accountCollection: Collection

beforeAll(async () => await MongoHelper.connect(process.env.MONGO_URL as string))
beforeEach(async () => {
  surveysCollection = await MongoHelper.getCollection('surveys')
  await surveysCollection.deleteMany({})
  accountCollection = await MongoHelper.getCollection('accounts')
  await accountCollection.deleteMany({})
})
afterAll(async () => await MongoHelper.disconnect())

describe('Survey Routes', () => {
  describe('POST /surveys', () => {
    test('should return 403 on add survey without accessToken', async () => {
      await request(app).post('/api/surveys').send({
        question: 'any_question',
        answers: [{ image: 'any_image', answer: 'any_answer' }]
      }).expect(403)
    })

    test('should return 204 on add survey with accessToken', async () => {
      const addAccount = await accountCollection.insertOne({ name: 'any_name', email: 'any_email@mail.com', password: '123', role: 'admin' })
      const id = new ObjectId(addAccount.insertedId)
      const accessToken = sign({ id: id.toString() }, env.jwtSecret)
      await accountCollection.updateOne({ _id: id }, { $set: { accessToken } })
      await request(app).post('/api/surveys').set('x-access-token', accessToken).send({
        question: 'any_question', answers: [{ answer: 'any_answer', image: 'any_image' }]
      }).expect(204)
    })
  })

  describe('GET /surveys', () => {
    test('should return 403 on load surveys without accessToken', async () => {
      await request(app).get('/api/surveys').expect(403)
    })
  })
})
