import { ObjectId } from 'mongodb'
import { AddSurveyModel, AddSurveyRepository, LoadSurveyByIdRepository, LoadSurveysRepository, MongoHelper, SurveyModel, SurveyModelRepo } from './survey-mongo-repository-protocols'

export class SurveyMongoRepository implements AddSurveyRepository, LoadSurveysRepository, LoadSurveyByIdRepository {
  async add (surveyData: AddSurveyModel): Promise<void> {
    const surveyCollection = await MongoHelper.getCollection('surveys')
    await surveyCollection.insertOne(surveyData)
  }

  async loadAll (): Promise<SurveyModel[]> {
    const surveyCollection = await MongoHelper.getCollection('surveys')
    const survey: SurveyModel[] = (await surveyCollection.find().toArray()).map(MongoHelper.map)
    return survey
  }

  async loadById (id: string): Promise<SurveyModelRepo> {
    const surveyCollection = await MongoHelper.getCollection('surveys')
    const surveyModelRepo = await surveyCollection.findOne({ _id: new ObjectId(id) })
    return MongoHelper.map(surveyModelRepo)
  }
}
