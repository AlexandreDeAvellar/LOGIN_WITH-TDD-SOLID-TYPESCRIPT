import { Collection, ObjectId } from 'mongodb'
import { AddAccountModel } from '../../../../domain/usecases/add-account'
import { MongoHelper } from '../helpers/mongo-helper'
import { AccountMongoRepository } from './account-mongo-repository'

let accountCollection: Collection

const fakeAccountModel: AddAccountModel = {
  name: 'any_name',
  email: 'any_email@mail.com',
  password: 'any_password'
}

describe('Account Mongo Repository', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL as string)
  })

  beforeEach(async () => {
    accountCollection = await MongoHelper.getCollection('accounts')
    await accountCollection.deleteMany({})
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  const makeSut = (): AccountMongoRepository => {
    return new AccountMongoRepository()
  }

  describe('add()', () => {
    it('Should return an account on add success', async () => {
      const sut = makeSut()
      const account = await sut.add(fakeAccountModel)
      expect(account).toBeTruthy()
      expect(account.id).toBeTruthy()
      expect(account.name).toBe('any_name')
      expect(account.email).toBe('any_email@mail.com')
      expect(account.password).toBe('any_password')
    })
  })

  describe('laodByEmail()', () => {
    it('should return null if loadByEmail fails', async () => {
      const sut = makeSut()
      await accountCollection.insertOne(fakeAccountModel)
      const account = await sut.loadByEmail('invalid_email@mail.com')
      expect(account).toBeFalsy()
    })

    it('Should return an account on loadByEmail success', async () => {
      const sut = makeSut()
      await accountCollection.insertOne(fakeAccountModel)
      const account = await sut.loadByEmail('any_email@mail.com')
      expect(account).toBeTruthy()
      expect(account?.id).toBeTruthy()
      expect(account?.name).toBe('any_name')
      expect(account?.email).toBe('any_email@mail.com')
      expect(account?.password).toBe('any_password')
    })
  })

  describe('updateAccessToken()', () => {
    it('should update accessToken account if updateAccessToken success', async () => {
      const sut = makeSut()
      const response = await accountCollection.insertOne(fakeAccountModel)
      const id = response.insertedId.toString()
      const loadAccount = await accountCollection.findOne({ _id: new ObjectId(id) })
      expect(loadAccount?.accessToken).toBeFalsy()
      await sut.updateAccessToken(id, 'any_token')
      const account = await accountCollection.findOne({ _id: new ObjectId(id) })
      expect(account).toBeTruthy()
      expect(account?.accessToken).toBe('any_token')
    })
  })

  describe('loadBytoken()', () => {
    test('should return an account on loadByToken without role', async () => {
      const sut = makeSut()
      await accountCollection.insertOne({ ...fakeAccountModel, accessToken: 'any_token' })
      const account = await sut.loadByToken('any_token')
      expect(account).toBeTruthy()
      expect(account?.id).toBeTruthy()
      expect(account?.name).toBe('any_name')
      expect(account?.email).toBe('any_email@mail.com')
      expect(account?.password).toBe('any_password')
    })
  })
})
