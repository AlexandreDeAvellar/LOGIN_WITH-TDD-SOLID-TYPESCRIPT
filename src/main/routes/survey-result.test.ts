import { AddSurveyModel } from '../../domain/usecases/add-survey'
import { MongoHelper } from '../../infra/db/mongodb/helpers/mongo-helper'
import request from 'supertest'
import app from '../config/app'
import { Collection, ObjectId } from 'mongodb'
import MockDate from 'mockdate'
import { sign } from 'jsonwebtoken'
import env from '../config/env'

let accountCollection: Collection
let surveysCollection: Collection

const makeFakeAddSurveyModel = (): AddSurveyModel => ({
  question: 'any_question', date: new Date(), answers: [{ answer: 'any_answer', image: 'any_image' }]
})

describe('PUT /surveys/:surveyId/result', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL as string)
    accountCollection = await MongoHelper.getCollection('accounts')
    surveysCollection = await MongoHelper.getCollection('surveys')
    MockDate.set(new Date())
  })

  beforeEach(async () => {
    await accountCollection.deleteMany({})
    await surveysCollection.deleteMany({})
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
    MockDate.reset()
  })

  describe('PUT /surveys/:surveyId/results', () => {
    test('should return 403 on save survey result without accessToken', async () => {
      await request(app).put('/api/surveys/surveyId/results').send({ answer: 'any_answer' }).expect(403)
    })

    test('should return 200 on save survey result with accessToken', async () => {
      const account = await accountCollection.insertOne({ name: 'any_name', email: 'any_mail', password: 'any_pass' })
      const id = account.insertedId.toString()
      const accessToken = sign(id, env.jwtSecret)
      await accountCollection.updateOne({ _id: new ObjectId(id) }, { $set: { accessToken } })
      const survey = await surveysCollection.insertOne(makeFakeAddSurveyModel())
      await request(app).put(`/api/surveys/${survey.insertedId.toString()}/results`)
        .set('x-access-token', accessToken)
        .send({ answer: 'any_answer' }).expect(200)
    })
  })

  describe('GET /surveys/:surveyId/results', () => {
    test('should return 403 on save survey result without accessToken', async () => {
      await request(app).get('/api/surveys/surveyId/results').send({ answer: 'any_answer' }).expect(403)
    })

    test('should return 200 on save survey result with accessToken', async () => {
      const account = await accountCollection.insertOne({ name: 'any_name', email: 'any_mail', password: 'any_pass' })
      const id = account.insertedId.toString()
      const accessToken = sign(id, env.jwtSecret)
      await accountCollection.updateOne({ _id: new ObjectId(id) }, { $set: { accessToken } })
      const survey = await surveysCollection.insertOne(makeFakeAddSurveyModel())
      await request(app).get(`/api/surveys/${survey.insertedId.toString()}/results`)
        .set('x-access-token', accessToken)
        .send({ answer: 'any_answer' }).expect(200)
    })
  })
})
