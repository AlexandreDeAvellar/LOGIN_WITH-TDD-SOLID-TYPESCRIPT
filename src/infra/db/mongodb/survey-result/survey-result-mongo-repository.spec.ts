import { SurveyResultMongoRepository } from './survey-result-mongo-repository'
import { MongoHelper, makeFakeSurveyResultDataRepo } from './survey-result-mongo-repository-protocols'
import { Collection } from 'mongodb'
import MockDate from 'mockdate'

const makeFakeAddSurveyModel = (): any => ({
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
  sut: SurveyResultMongoRepository
}

const makeSut = (): SutTypes => {
  const sut = new SurveyResultMongoRepository()
  return { sut }
}

let surveyResult: Collection
let surveys: Collection

beforeAll(async () => {
  await MongoHelper.connect(process.env.MONGO_URL as string)
  MockDate.set(new Date())
})

beforeEach(async () => {
  surveyResult = await MongoHelper.getCollection('surveyResults')
  surveys = await MongoHelper.getCollection('surveys')
  await surveyResult.deleteMany({})
  await surveys.deleteMany({})
})

afterAll(async () => {
  await MongoHelper.disconnect()
  MockDate.reset()
})

describe('SurveyResultMongoRepository', () => {
  describe('save()', () => {
    test('should add a survey result if its new', async () => {
      const { sut } = makeSut()
      const surveyAdd = await surveys.insertOne(makeFakeAddSurveyModel())
      const surveyResultModel = await sut.save({ ...makeFakeSurveyResultDataRepo(), surveyId: surveyAdd.insertedId.toString() })
      expect(surveyResultModel).toBeTruthy()
      expect(surveyResultModel?.surveyId).toEqual(surveyAdd.insertedId)
      expect(surveyResultModel?.answers[0].count).toBe(1)
      expect(surveyResultModel?.answers[0].percent).toBe(100)
    })

    test('should update a survey result if its not new', async () => {
      const { sut } = makeSut()
      await sut.save(makeFakeSurveyResultDataRepo())
      const surveyAdd = await surveys.insertOne(makeFakeAddSurveyModel())
      const surveyResultModel = await sut.save({ ...makeFakeSurveyResultDataRepo(), surveyId: surveyAdd.insertedId.toString() })
      expect(surveyResultModel).toBeTruthy()
      expect(surveyResultModel?.surveyId).toEqual(surveyAdd.insertedId)
      expect(surveyResultModel?.answers[0].count).toBe(1)
      expect(surveyResultModel?.answers[0].percent).toBe(100)
      // expect(surveyResultModel.surveyId).toBe(makeFakeSurveyResultModelRepo().surveyId)
      // expect(surveyResultModel).toEqual(expect.objectContaining({ ...makeFakeSurveyResultModelRepo(), answer: 'update_answer' }))
    })
  })
})
