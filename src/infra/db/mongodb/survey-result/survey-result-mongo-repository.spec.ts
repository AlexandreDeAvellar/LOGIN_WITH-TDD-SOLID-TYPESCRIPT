import { SurveyResultMongoRepository } from './survey-result-mongo-repository'
import { SurveyResultDataRepo, MongoHelper } from './survey-result-mongo-repository-protocols'
import { Collection } from 'mongodb'
import MockDate from 'mockdate'

const makeFakeSurveyResultDataRepo = (): SurveyResultDataRepo => ({
  accountId: 'any_id', answer: 'any_answer', date: new Date(), surveyId: 'any_id'
})

interface SutTypes {
  sut: SurveyResultMongoRepository
}

const makeSut = (): SutTypes => {
  const sut = new SurveyResultMongoRepository()
  return { sut }
}

let surveyResult: Collection
beforeAll(async () => {
  await MongoHelper.connect(process.env.MONGO_URL as string)
  MockDate.set(new Date())
})

beforeEach(async () => {
  surveyResult = await MongoHelper.getCollection('surveyResults')
  await surveyResult.deleteMany({})
})

afterAll(async () => {
  await MongoHelper.disconnect()
  MockDate.reset()
})

describe('SurveyResultMongoRepository', () => {
  describe('save()', () => {
    test('should add a survey result if its new', async () => {
      const { sut } = makeSut()
      const surveyResultModel = await sut.save(makeFakeSurveyResultDataRepo())
      expect(surveyResultModel.id).toBeTruthy()
      expect(surveyResultModel).toEqual(expect.objectContaining(makeFakeSurveyResultDataRepo()))
    })

    test('should update a survey result if its not new', async () => {
      const { sut } = makeSut()
      await sut.save(makeFakeSurveyResultDataRepo())
      const surveyResultModel = await sut.save({ ...makeFakeSurveyResultDataRepo(), answer: 'update_enswer' })
      expect(surveyResultModel.id).toBeTruthy()
      expect(surveyResultModel).toEqual(expect.objectContaining({ ...makeFakeSurveyResultDataRepo(), answer: 'update_enswer' }))
    })
  })
})
