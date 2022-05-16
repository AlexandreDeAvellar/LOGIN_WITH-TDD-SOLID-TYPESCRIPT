import { Collection } from 'mongodb'
import { SurveyMongoRepository } from './survey-mongo-repository'
import { AddSurveyModel, MongoHelper } from './survey-mongo-repository-protocols'
import MockDate from 'mockdate'

let surveyCollection: Collection

beforeAll(async () => {
  await MongoHelper.connect(process.env.MONGO_URL as string)
})

beforeEach(async () => {
  surveyCollection = await MongoHelper.getCollection('surveys')
  await surveyCollection.deleteMany({})
})

afterAll(async () => {
  await MongoHelper.disconnect()
})

const makeFakeAddSurveyModel = (): AddSurveyModel => ({
  question: 'any_question',
  answers: [{
    answer: 'any_answer',
    image: 'any_image'
  }, {
    answer: 'other_answer'
  }],
  date: new Date()
})

interface SutTypes {
  sut: SurveyMongoRepository
}

const makeSut = (): SutTypes => {
  const sut = new SurveyMongoRepository()
  return { sut }
}

describe('SurveyMongoRepository', () => {
  beforeAll(() => MockDate.set(new Date()))
  afterAll(() => MockDate.reset())

  describe('add()', () => {
    test('should add survey on success', async () => {
      const { sut } = makeSut()
      await sut.add(makeFakeAddSurveyModel())
      const survey = await surveyCollection.findOne({ question: 'any_question' })
      expect(survey).toBeTruthy()
    })
  })
})
