import app from '../config/app'
import { noCache } from './no-cache'
import { Request, Response } from 'express'
import request from 'supertest'

describe('NoCache Middleware', () => {
  test('should desable cache', async () => {
    app.get('/test_no_cache', noCache, (req: Request, res: Response) => {
      res.send()
    })
    await request(app).get('/test_no_cache')
      .expect('cache-control', 'no-store, no-cache, must-revalidate, proxy-revalidate')
      .expect('pragma', 'no-cache')
      .expect('expires', '0')
      .expect('surrogate-control', 'no-store')
  })
})
