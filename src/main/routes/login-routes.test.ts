import { hash } from 'bcrypt'
import { Collection } from 'mongodb'
import request from 'supertest'
import { MongoHelper } from '../../infra/db/mongodb/helpers/mongo-helper'
import app from '../config/app'

let acountCollection: Collection

describe('Login Routes', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL as string)
  })

  beforeEach(async () => {
    acountCollection = await MongoHelper.getCollection('accounts')
    await acountCollection.deleteMany({})
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  describe('POST /signup', () => {
    it('Should return 200 on signup', async () => {
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

  describe('POST /login', () => {
    test('should return 200 on login', async () => {
      const passwordHashed = await hash('123', 12)
      await acountCollection.insertOne({
        name: 'Ale',
        email: 'ale@mail.com',
        password: passwordHashed
      })

      await request(app)
        .post('/api/login')
        .send({
          email: 'ale@mail.com',
          password: '123'
        })
        .expect(200)
    })

    test('should return 401 if invalid credentials are provided', async () => {
      const passwordHashed = await hash('123', 12)
      await acountCollection.insertOne({
        name: 'Ale',
        email: 'ale@mail.com',
        password: passwordHashed
      })

      await request(app)
        .post('/api/login')
        .send({
          email: 'ale@mail.com',
          password: '1234'
        })
        .expect(401)
    })
  })
})
