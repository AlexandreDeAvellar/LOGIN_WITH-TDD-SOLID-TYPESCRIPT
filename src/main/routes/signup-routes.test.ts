import request from 'supertest'
import { MongoHelper } from '../../infra/db/mongodb/helpers/mongo-helper'
import app from '../config/app'

describe('Signup Routes', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL as string)
  })

  beforeEach(async () => {
    const acountCollection = await MongoHelper.getCollection('accounts')
    await acountCollection.deleteMany({})
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  it('Should return an account on success', async () => {
    await request(app)
      .post('/api/signup')
      .send({
        name: 'Ale',
        email: 'ale@mail.com',
        password: '123',
        passwordConfirmation: '123'
      })
      .expect(200)
  })
})
