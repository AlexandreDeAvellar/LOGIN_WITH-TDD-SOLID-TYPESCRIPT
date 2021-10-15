import request from 'supertest'
import app from '../config/app'

describe('Signup Routes', () => {
  it('Should return an account on success', async () => {
    await request(app)
      .post('/api/signup')
      .send({
        name: 'Ale',
        email: 'ale@mail.com',
        password: '123',
        passwordConfirm: '123'
      })
      .expect(200)
  })
})
